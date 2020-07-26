const moment = require("moment");
const db = require("../models");
const xml2js = require('xml2js');
const fs = require('fs');
const PDFDocument = require('pdfkit');
const nodemailer = require('nodemailer');

exports.scan = (req, res) => {
  const { spawn } = require('child_process');
  const ip = req.body.ip_addr;

  if (!req.body.ip_addr) {
    res.status(400).send({ message: "This field can not be empty!" });
    return;
  }

  let outFile = 'scan-' + moment().format('DD-MM-YYYYTHH:mm:ss') + '.xml';
  const nmap = spawn('nmap', ['--privileged', '-A', '-T4', '-O', '--osscan-guess', '-oX', outFile, ip]);

  nmap.stdout.setEncoding('utf8');
  nmap.stdout.on('data', (data) => {
  });

  nmap.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
    res.status(500).json(data);
  });

  nmap.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
    parseNmapOutput(outFile, ip);
    res.status(200).json("Scan done check report on history");
  });
};

exports.getDoc = (req, res) => {
  const reportFolder = './report/scan';
  let report = [];
  fs.readdir(reportFolder, (err, files) => {
    files.forEach(file => {
      report.push(file);
    });
    res.status(200).json(report);
  });
};


function parseNmapOutput(fileName, ip) {
  const parser = new xml2js.Parser({ignoreAttrs : false, mergeAttrs : true});
  let portInfo = [], osInfo = [], info = [];

  fs.readFile(fileName, (err, data) => {
    parser.parseString(data, (err, result) => {
      if (err) throw err;

      let out = JSON.parse(JSON.stringify(result));
      let count = Object.keys(out["nmaprun"]["host"][0]["ports"][0]["port"]).length;
      let countOS = Object.keys(out["nmaprun"]["host"][0]["os"][0]["osmatch"]).length;

      // get info about ports and service
      for (let i = 0; i < count; i++) {
        let openPort = out["nmaprun"]["host"][0]["ports"][0]["port"][i]["portid"][0];
        let protocol = out["nmaprun"]["host"][0]["ports"][0]["port"][i]["protocol"][0];
        let state = out["nmaprun"]["host"][0]["ports"][0]["port"][i]["state"][0]["state"][0];
        let serviceName = out["nmaprun"]["host"][0]["ports"][0]["port"][i]["service"][0]["name"][0];

        let obj = {
          openPort: openPort,
          protocol: protocol,
          state: state,
          serviceName: serviceName
        };
        portInfo.push(obj);
      }

      //get OS info
      for (let i = 0; i < countOS; i++) {
        let os = out["nmaprun"]["host"][0]["os"][0]["osmatch"][i]["name"][0];
        let accuracy = out["nmaprun"]["host"][0]["os"][0]["osmatch"][i]["accuracy"][0];

        let obj = {
          os: os,
          accuracy: accuracy
        };
        osInfo.push(obj);
      }

      // global info
      let timeToScan = out["nmaprun"]["runstats"][0]["finished"][0]["elapsed"][0];
      let obj = {
        timeToScan: timeToScan,
        urlOrIp: ip
      }
      info.push(obj);
      // gen PDF
      generatePDF(info, portInfo, osInfo);
    });
  });

  fs.unlink(fileName, (err) => {
    if (err) throw err;
  });

};

function generatePDF(info, portInfo, osInfo) {
  try {
    const doc = new PDFDocument();
    let dateTime = moment().format('MMMM Do YYYY, h:mm:ss a');
    let outFile = 'report/scan/report-' + moment().format('DD-MM-YYYYTHH:mm:ss') + '.pdf';

    // PAGE 1
    doc.font('Helvetica').fontSize(25)
    .text('SCAN Report',50, 70, {align: 'center'})
    .text(dateTime, 50, 130, {align: 'center'})
    .text('Target: ' + info[0]["urlOrIp"], 50, 190, {align: 'center'})

    doc.font('Helvetica-Bold').fontSize(16).fillColor('red')
    .text('This document contains confidential and critical information, please do not distribute it outside of your company ', 50, 300, {align: 'center'})

    doc.font('Helvetica').fontSize(18).fillColor('black')
    .text('https://front-saas-dashboard.web.app/', 50, 500, {align: 'center', link: 'https://front-saas-dashboard.web.app/', underline: 'true'})

    doc.image('./assets/logo.png', 100, 500, {fit: [400, 300],align: 'center', valign: 'center'});

    // PAGE 2
    doc.addPage()

    doc.font('Helvetica').fontSize(16).fillColor('black')
    .text('Nmap take ' + info[0]["timeToScan"] + ' seconds to scan the target.')

    doc.font('Helvetica-Bold').fontSize(16).fillColor('black')
    .text('Port scanning result: ')

    for (let i = 0; i < portInfo.length; i++) {
      let openPort = portInfo[i]["openPort"];
      let serviceName = portInfo[i]["serviceName"];
      let protocol = portInfo[i]["protocol"];
      let state = portInfo[i]["state"];

      doc.font('Helvetica').fontSize(16).fillColor('black')
      .text('port:' + openPort + ' | ' + 'service: ' + serviceName + ' | ' + 'protocol: ' + protocol + ' | ' + 'state: ' + state);
    }

    doc.font('Helvetica-Bold').fontSize(16).fillColor('black')
    .text('OS scanning result: ')

    for (let i = 0; i < osInfo.length; i++) {
      let os = osInfo[i]["os"];
      let accuracy = osInfo[i]["accuracy"];

      doc.font('Helvetica').fontSize(16).fillColor('black')
      .text('OS:' + os + ' | ' + 'accuracy: ' + accuracy + '%');
    }

    doc.font('Helvetica').fontSize(18).fillColor('black')
    .text('https://front-saas-dashboard.web.app/', 50, 500, {align: 'center', link: 'https://front-saas-dashboard.web.app/', underline: 'true'})

    doc.pipe(fs.createWriteStream(outFile));
    sendEmail(outFile);
    doc.end();
  } catch (err) {
    console.error('PDF ERROR: ' + err.message);
  }
}

function sendEmail(doc) {
  let transport = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: process.env.MAILTRAP_USER,
      pass: process.env.MAILTRAP_PASS
    }
  });
  const message = {
    from: 'report@yawas.com',
    to: 'customer@epitech.eu',
    subject: 'SCAN Report',
    text: 'Hello dear customer,\n\nIn attachment you can find your scan report.\n\nBest regards,\nThe YAWAS team.',
    attachments: [{
      filename: doc,
      path: './'+doc,
      contentType: 'application/pdf'
    }]
  };
  transport.sendMail(message, function(err, info) {
      if (err) {
        console.log(err)
      } else {
        console.log(info);
      }
  });
}
