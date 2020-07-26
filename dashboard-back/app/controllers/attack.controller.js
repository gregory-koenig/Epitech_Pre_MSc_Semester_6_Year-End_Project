const fs = require('fs');
const PDFDocument = require('pdfkit');
const nodemailer = require('nodemailer');
const request = require('request');
const axios = require('axios');
const moment = require('moment');

let cmsDetected = {};
let sqlmapOut = [];
let niktoOut = [];

exports.attack = (req, res) => {
  attack().then(() => generatePDF());

  res.status(200).json("ATTACK");
};

async function attack() {
  await detectCMS('drupal.fr');
  await attackCMS(cmsDetected);
  await sqlInjection();
  detectSensitiveEndpointAndDirectory();
}

exports.getDoc = (req, res) => {
  const reportFolder = './report/attack';
  let report = [];
  fs.readdir(reportFolder, (err, files) => {
    files.forEach(file => {
      report.push(file);
    });
    res.status(200).json(report);
  });
};


// DETECT if website use a known CMS
async function detectCMS(siteToScan) {
  let apiKey = process.env.WHAT_CMS_API_KEY;

  let res = await axios.get('https://whatcms.org/API/CMS?key='+apiKey+'&url='+siteToScan, {
    headers:{'Content-Type': 'application/x-www-form-urlencoded'}
  });

  cmsDetected = {
    name: res.data.result.name,
    version: res.data.result.version,
    confidence: res.data.result.confidence
  }
}

// Enumerate plugin / theme / user and bruteforce login
async function attackCMS(cmsDetected) {
  switch(cmsDetected) {
    case "WordPress":
      console.log("WORDPRESS")
      break;
    case "Drupal":
      //Drupagedon
      console.log("Drupal")
      break;
    default:
      console.log("CMS is " + cmsDetected.name)
  }
}


function detectSensitiveEndpointAndDirectory() {
  const { spawn } = require('child_process');

  const sqlmap = spawn('nikto', ['-h', '192.168.1.105']);

  sqlmap.stdout.setEncoding('utf8');
  sqlmap.stdout.on('data', (data) => {
    niktoOut.push(data)
  });

  sqlmap.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
    res.status(500).json(data);
  });

  sqlmap.on('close', (code) => {
    console.log(`nikto done`);
  });
}


// SQL INJECTION
async function sqlInjection() {
  const { spawn } = require('child_process');

  const sqlmap = await spawn('sqlmap', ['-u', '192.168.1.105', '--batch']);

  sqlmap.stdout.setEncoding('utf8');
  sqlmap.stdout.on('data', (data) => {
    sqlmapOut.push(data)
  });

  sqlmap.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
    res.status(500).json(data);
  });

  sqlmap.on('close', (code) => {
    console.log(`sqlmap done`);
  });
}


function generatePDF() {
  try {
    const doc = new PDFDocument();
    let dateTime = moment().format('MMMM Do YYYY, h:mm:ss a');
    let outFile = 'report/attack/report-' + moment().format('DD-MM-YYYYTHH:mm:ss') + '.pdf';

    // PAGE 1
    doc.font('Helvetica').fontSize(25)
    .text('ATTACK Report',50, 70, {align: 'center'})
    .text(dateTime, 50, 130, {align: 'center'})
    .text('Target: ', 50, 190, {align: 'center'})

    doc.font('Helvetica-Bold').fontSize(16).fillColor('red')
    .text('This document contains confidential and critical information, please do not distribute it outside of your company ', 50, 300, {align: 'center'})

    doc.font('Helvetica').fontSize(18).fillColor('black')
    .text('https://front-saas-dashboard.web.app/', 50, 500, {align: 'center', link: 'https://front-saas-dashboard.web.app/', underline: 'true'})

    doc.image('./assets/logo.png', 100, 500, {fit: [400, 300],align: 'center', valign: 'center'});

    // PAGE 2
    doc.addPage()
    doc.font('Helvetica-Bold').fontSize(16).fillColor('black')
    .text('CMS ATTACK')
    doc.font('Helvetica').fontSize(16).fillColor('black')
    .text('CMS Detected')
    doc.font('Helvetica').fontSize(16).fillColor('black')
    .text('CMS: ' + cmsDetected.name + ' Version: ' + cmsDetected.version + ' Accuracy: ' + cmsDetected.confidence)

    doc.font('Helvetica').fontSize(18).fillColor('black')
    .text('https://front-saas-dashboard.web.app/', 50, 500, {align: 'center', link: 'https://front-saas-dashboard.web.app/', underline: 'true'})

    // PAGE 3
    doc.addPage()
    doc.font('Helvetica-Bold').fontSize(16).fillColor('black')
    .text('SQL Injection')
    doc.font('Helvetica').fontSize(16).fillColor('black')
    .text('SQL Map output')
    doc.font('Helvetica').fontSize(16).fillColor('black')
    .text(sqlmapOut)

    // PAGE 4
    doc.addPage()
    doc.font('Helvetica-Bold').fontSize(16).fillColor('black')
    .text('Sensitive endpoint and directory')
    doc.font('Helvetica').fontSize(16).fillColor('black')
    .text('Nikto output')
    doc.font('Helvetica').fontSize(16).fillColor('black')
    .text(niktoOut)

    doc.pipe(fs.createWriteStream(outFile));
    sendEmail(outFile)
    doc.end();
  } catch(err) {
    console.error('PDF ERROR: ' + err.message)
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
    subject: 'ATTACK Report',
    text: 'Hello dear customer,\n\nIn attachment you can find your attack report.\n\nBest regards,\nThe YAWAS team.',
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
