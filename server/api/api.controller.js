'use strict';
const config = require('@trust1team/t1t-config');
const logger = require('@trust1team/t1t-log');
const gcloud = require('google-cloud');
const request = require('request');
const rp = require('request-promise-native');
const _ = require('lodash');
const q = require('q');
const auth = require('../components/auth.service');
const service = require('./api.service');
const signbox = require('../components/signbox.service');
const response = require(__base + 'server/util/response.util');
const {Pool, Client} = require('pg');
const axios = require('axios');
const https = require('https');
const setCookie = require('set-cookie-parser');
const fs = require('fs');
const path = require('path')
const puppeteer = require('puppeteer');
const handlebars = require("handlebars");
const md5 = require('md5');

//var cookie;


let datastore = gcloud.datastore({
  projectId: config.gcloud.project,
  keyFilename: __base + config.gcloud.keyfile
});

module.exports = {
  convertJP2toJPEG: convertJP2toJPEG,
  getJwt: getJwt,
  getVersion: getVersion,
  processDownload: processDownload,
  processUnknownCard: processUnknownCard,
  getValidatePhone: getValidatePhone,
  postValidatePhone: postValidatePhone,
  putValidatePhone: putValidatePhone,
  getValidateGetPhone: getValidateGetPhone,
  sms: sms,
  initcli: initClient,
  getTemplateQR: getTemplateStartQrCode,
  sendTask: sendTask,
  addPdf: addAttachmentPDF,
  notify: notifyTaskOwner,
  pdfTest: pdftest,
  task1callback: task1callback,
};

function task1callback(req,res){

  var json = req;
  logger.info(json);

}

function initClient(req,response){
  let acessKey = config.snp.accessKey;
  let secretKey = config.snp.secretKey;
  let apiUrl = config.snp.api_url;
  let scheme = config.snp.scheme;
  let data = {
    accessKey: acessKey,
    secretKey : secretKey
  }

  axios.post(scheme+'://'+apiUrl+'/api/auth',data).then((res)=>{
    let status = res.status;
    if(status===200){
      const cookies = setCookie.parse(res, {
        decodeValues: true,  // default: true
        map: true           //default: false
      });
      //let cookie = cookies['webda'];
      //logger.info('line 72: '+cookies['webda'].value)
      return response.status(200).json({data:cookies['webda']});
    }else{
      return response.status(413);
    }
  });
  
}

function getTemplateStartQrCode(req,response){
    //logger.info(cookie)
    let cookie = req.body.cookie;
   
    let uuid = req.body.uuid;
    let apiUrl = config.snp.api_url;
    let scheme = config.snp.scheme;
    let data ={
      action: 'register' 
    }
    
    axios.request({
      url: scheme+'://'+apiUrl+'/templates/'+uuid+'/qrcode',
      method: 'put',
      data: data,
      headers:{
        'Content-Type': 'application/octet-stream',
        'Set-Cookie': 'webda='+cookie
      }
    }).then((res)=>{
      let status = res.status;
      if(status===200){
        var task = null;
        var src = null;
        //logger.info(res)
        return response.status(200).json({data:res.data});
      }else{
        return response.status(403);
      }
    })
}

function sendTask(req,response){
  let templateuuid = req.body.uuid;
  let email = req.body.email; // user´s email
  let cookie = req.body.cookie;
  let apiUrl = config.snp.api_url;
  let scheme = config.snp.scheme;
  let ident = {
    ident: email.toLowerCase().trim(),
    type: 'email'
  }
  axios.request({
    url: scheme+"://"+apiUrl+"/templates/"+templateuuid+"/push",
    method: 'post',
    data: ident,
    headers:{
      'Content-Type': 'application/json',
      'Set-Cookie':'webda='+cookie.value    }
  }).then((res)=>{
    if(res.status===200){
      var task = res.data;
      logger.info(res.data)
      var taskguuid = task.uuid; //task.guuid?
      
          var data ={
            taskuuid: taskguuid,
            vieweruuid: task.subTasks[0].uuid
          }
          return response.status(200).json({data:{success:true}});
        
      }
    }).catch((err)=>{
    return response.status(200).json({data:{success:false}})
  })
}

async function pdftest(req,res){
 var  rndata={
    rndata:{
    first_names: "David",
    name: "da Silva",
    },
    picData: 'data:image/png;base64,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Z2VSZWFkeXHJZTwAAAOGaVRYdFhNTDpjb20uYWRvYmUueG1wAAAAAAA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzExMSA3OS4xNTgzMjUsIDIwMTUvMDkvMTAtMDE6MTA6MjAgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6ZjAyODJiMTQtMTk5MC00N2Y2LWE3MjMtMjE1ZjYxMWE3MWI5IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjBEMzc0NzEzMEJFNTExRTZCMTA3OUQ2MjY2NjM3NkJEIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjBEMzc0NzEyMEJFNTExRTZCMTA3OUQ2MjY2NjM3NkJEIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE1IChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6ZDI2OGQ5YWUtYmEzMS00YTllLWFjOTQtNGU3NDAxMTVlOWRiIiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6Mzc2ZDJlMjQtNTQ1Yy0xMTc5LTk5MGQtZmNiNGVkODNhNmY3Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRh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'
      
  }
  logger.log("b")
  const pdf = await generateStep1PDF(rndata)
  return res.status(200);
}

async function generateStep1PDF(rndata){
  const data ={
    title: "Renta solutions",
    date: new Date().toLocaleDateString(),
    name: rndata.rndata.first_names+" "+rndata.rndata.name,
    photo: rndata.picData
  }
  var htmlTemplate = fs.readFileSync('./server/templates/viewer_template.html','utf8');
  var template = handlebars.compile(htmlTemplate);
  var html = template(data);

  //logger.info(html);
  var pdfPath = './pdf/first_step.pdf';
  var options = {
		format: 'A4',
		margin: {
			top: '20px',
			right: '20px',
			bottom: '20px',
			left: '20px'
    },
    path: pdfPath
	}
	const browser = await puppeteer.launch();
	var page = await browser.newPage();
	await page.setContent(html, {
		waitUntil: ['domcontentloaded', 'networkidle0', 'load']
	});
  page.emulateMedia('screen')

  const pdf=await page.pdf(options);
  logger.info(pdf)
  fs.writeFileSync(pdfPath,pdf)
  await browser.close();
  return pdf;

	
  
}

function addAttachmentPDF(req,response/* taskuuid, stepuuid, pdf*/){
  let cookie = req.body.cookie;
  let rndata = req.body.rndata;
  let taskguuid = req.body.taskguuid;
  let vieweruuid = req.body.vieweruuid;
  generateStep1PDF(rndata).then(()=>{
    fs.readFile('./pdf/first_step.pdf').then((pdf)=>{
      let apiUrl = config.snp.api_url;
      let scheme = config.snp.scheme;
      let date = new Date();
      let pdfSize = fs.statSync('./viewpdf')['size'];
      let att = {
        originalname: "attachment_"+taskguuid+"_"+date.getTime()+".pdf",
        mimetype:"application/pdf",
        size: pdfSize,
        hash: md5(pdf),
        challenge: 1,
        metadatas:{
          creationDate: date.toLocaleDateString(),
          uuid: vieweruuid,
          order: 0
        }
      }
      axios.request({
        url: scheme+"://"+apiUrl+"/binary/upload/tasks/"+taskguuid+"/attachments/add",
        method: "put",
        data: att,
        headers:{
          'Content-Type': 'application/json',
          'Set-Cookie': 'webda='+cookie
        }
      }).then((res)=>{
        if(res.status===200){
          var src = res.data;
          if(!src.done){
            var url = src.url;
            var md5code = src.md5;
            axios.request({
              url: url,
              headers:{
                'Content-Type' : 'application/octet-stream',
                'Content-MD5': md5code
              },
              data: pdf// pdf being a fs buffer
            }).then((res)=>{
              if(res.status<=204){
                return response.status(200);
              }else{
                return response.status(400);
              }
            })
          }else{
            return response.status(400);
          }
        }else{
          return response.status(400);
        }
      })
    
      });
  })
}

function notifyTaskOwner(req,response/* task uuid */){
  let cookie = req.body.cookie;
  let taskguuid = req.body.taskguuid;
  let apiUrl = config.snp.api_url;
  let scheme = config.snp.scheme;

  axios.request({
    url: scheme+"://"+apiUrl+"/tasks/"+taskguuid+"/notify",
    method: "get",
    headers:{
      'Content-Type':'application/json',
      'Set-Cookie':'webda='+cookie
    }
  }).then((res)=>{
    let status = res.status;
    if(status<=204){
      return response.status(200);
    }else{
      return response.status(404);
    }
  })
}



function getValidateGetPhone(req, res) {
  const postgres = new Client({
    user: config.postgres.user,
    host: config.postgres.host,
    database: config.postgres.database,
    password: config.postgres.password,
    port: config.postgres.port,
  });

  postgres.connect();
  const values = [req.query.gsm]
  console.log(req.query)
  postgres.query('SELECT * FROM validations where phonenumber=$1', values, (error, response) => {
    postgres.end();
    if (response) {
      return res.status(200).json(response.rows[0])
    }
    else {
      return response.error(error, response)
    }
  })
}

function sms(req, res) {
  req.body.message = "Your code is " + req.body.message;
  var options = {
    method: 'POST',
    url: "https://apim.t1t.be/trust1team/sms-api/v1/sms",
    body: req.body,
    headers: {
      "apikey": config.sms.apikey,
      "content-type": "application/json"
    },
    json: true
  };

  rp(options).then(response => {
    res.status(200).json({success: true})
  }, error => {
    res.status(500).json(error)
  })
}

function putValidatePhone(req, res) {
  const postgres = new Client({
    user: config.postgres.user,
    host: config.postgres.host,
    database: config.postgres.database,
    password: config.postgres.password,
    port: config.postgres.port,
  });
  postgres.connect();
  let body = req.body
  const values = [body.id, body.otp]
  postgres.query('UPDATE "public"."validations" SET "otp" = ($2) WHERE "id" = ($1);', values, (error, response) => {
    postgres.end();
    if (response) {
      return res.status(200).json(response.rows[0])
    }
    else {
      return response.error(error, response)
    }
  })
}

function postValidatePhone(req, res) {
  const postgres = new Client({
    user: config.postgres.user,
    host: config.postgres.host,
    database: config.postgres.database,
    password: config.postgres.password,
    port: config.postgres.port,
  });

  postgres.connect();
  let body = req.body
  const values = [body.data, body.phone, body.otp]
  postgres.query('INSERT INTO "public"."validations" ("rndata", "phonenumber", "otp") VALUES($1, $2, $3) RETURNING id', values, (error, response) => {
    postgres.end();
    if (response) {
      return res.status(200).json(response.rows[0])
    }
    else {
      return response.error(error, response)
    }
  })
}

function getValidatePhone(req, res) {
  const postgres = new Client({
    user: config.postgres.user,
    host: config.postgres.host,
    database: config.postgres.database,
    password: config.postgres.password,
    port: config.postgres.port,
  });

  postgres.connect();
  console.log(req.query.id)
  const values = [req.query.id]

  postgres.query('SELECT * FROM validations where id=$1', values, (error, response) => {
    postgres.end();
    if (response) {
      return res.status(200).json(response.rows[0])
    }
    else {
      return response.error(error, response)
    }
  })
}

function convertJP2toJPEG(req, res) {
  if (!req.body.base64) return response.error({status: 400, message: 'base64 string is required'}, res);

  service.jp2000ToJpeg(req.body.base64).then(result => {
    return res.status(200).json({base64Pic: result});
  }, err => {
    return response.error(err, res);
  })
}

function getJwt(req, res) {
  auth.getJWT(function (err, result) {
    if (err) {
      return response.error(err, res);
    } else {
      return res.status(200).json(result.body);
    }
  })
}

function getVersion(req, res) {
  signbox.version(req.jwt).then(result => {
    return res.status(200).json(result);
  }, error => {
    return response.error(error, res);
  })
}

function processDownload(req, res) {
  /// Sanity checks
  let email = _.find(req.body, function (o, key) {
    return key === 'email';
  });
  if (!email) return res.status(400).json({success: false, data: 'Missing email parameter'});

  let emailOptIn = !!_.find(req.body, function (o, key) {
    return key === 'emailOptIn';
  });

  let dlUrl = _.find(req.body, function (o, key) {
    return key === 'dlUrl';
  });
  if (!dlUrl) return res.status(400).json({success: false, data: 'Missing download link parameter'});

  let platformName = _.find(req.body, function (o, key) {
    return key === 'platformName';
  });
  if (!platformName) return res.status(400).json({success: false, data: 'Missing platform name parameter'});

  let type = _.find(req.body, function (o, key) {
    return key === 'type';
  });
  if (!type) return res.status(400).json({success: false, data: 'Missing type identifier'});

  let payload = _.find(req.body, function (o, key) {
    return key === 'payload';
  });
  if (!payload) return res.status(400).json({success: false, data: 'Missing payload data'});


  // Send mail via mailgun
  let mailData = {
    from: config.mailgun.sender,
    to: email,
    subject: 'Download instructions for Trust1Connector',
    html: createHtmlEmail(dlUrl, platformName)
  };
  // fire request
  let url = config.mailgun.scheme + '://' + config.mailgun.user + ':' + config.mailgun.apikey + '@' + config.mailgun.url;
  request.post({url: url, formData: mailData}, function cb(err, httpResponse, body) {
    if (err) {
      return res.status(500).json({success: false, data: err.message});
    }

    let typeKey = datastore.key(type);

    let dataArray = _.concat([{name: 'created', value: new Date()}, {name: 'email', value: email}, {
      name: 'emailOptIn',
      value: emailOptIn
    }], payload);

    // Store object in GC datastore
    saveToDatastore(typeKey, dataArray, function (err) {
      if (err) {
        return res.status(500).json({success: false, data: err.message});
      }
      let id = typeKey.path.pop();
      return res.json({success: true, data: id});
    });
  });
}

function processUnknownCard(req, res) {
  /// Sanity checks
  let atr = _.find(req.body, function (o, key) {
    return key === 'atr';
  });
  if (!atr) return res.status(400).json({success: false, data: 'Missing atr parameter'});

  let type = _.find(req.body, function (o, key) {
    return key === 'type';
  });
  if (!type) return res.status(400).json({success: false, data: 'Missing type identifier'});

  let payload = _.find(req.body, function (o, key) {
    return key === 'payload';
  });
  if (!payload) return res.status(400).json({success: false, data: 'Missing payload'});


  let typeKey = datastore.key(type);
  let dataArray = _.concat([{name: 'created', value: new Date()}, {name: 'atr', value: atr}], payload);

  // Store object in GC datastore
  saveToDatastore(typeKey, dataArray, function (err) {
    if (err) {
      return res.status(500).json({success: false, data: err.message});
    }
    let id = typeKey.path.pop();
    return res.json({success: true, data: id});
  });
}

// Utility functions
function saveToDatastore(typeKey, data, cb) {
  return datastore.save({
    key: typeKey,
    data: data
  }, cb);
}

function createHtmlEmail(link, platform) {
  return '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml"><head> <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/> <title>ReadMyCards Connector Download</title> <style type="text/css">/* /\/\/\/\/\/\/\/\/ CLIENT-SPECIFIC STYLES /\/\/\/\/\/\/\/\/ */#outlook a{padding:0;}/* Force Outlook to provide a "view in browser" message */.ReadMsgBody{width:100%;}.ExternalClass{width:100%;}/* Force Hotmail to display emails at full width */.ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div{line-height: 100%;}/* Force Hotmail to display normal line spacing */body, table, td, p, a, li, blockquote{-webkit-text-size-adjust:100%; -ms-text-size-adjust:100%;}/* Prevent WebKit and Windows mobile changing default text sizes */table, td{mso-table-lspace:0pt; mso-table-rspace:0pt;}/* Remove spacing between tables in Outlook 2007 and up */img{-ms-interpolation-mode:bicubic;}/* Allow smoother rendering of resized image in Internet Explorer *//* /\/\/\/\/\/\/\/\/ RESET STYLES /\/\/\/\/\/\/\/\/ */body{margin:0; padding:0;}img{border:0; height:auto; line-height:100%; outline:none; text-decoration:none;}table{border-collapse:collapse !important;}body, #bodyTable, #bodyCell{height:100% !important; margin:0; padding:0; width:100% !important;}/* /\/\/\/\/\/\/\/\/ TEMPLATE STYLES /\/\/\/\/\/\/\/\/ *//*==========Page Styles==========*/#bodyCell{padding:20px;}#templateContainer{width:600px;}/*** @tab Page* @section background style* @tip Set the background color and top border for your email. You may want to choose colors that match your company\'s branding.* @theme page*/body, #bodyTable{/*@editable*/ background-color:#CFCFCF;}/*** @tab Page* @section background style* @tip Set the background color and top border for your email. You may want to choose colors that match your company\'s branding.* @theme page*/#bodyCell{}/*** @tab Page* @section email border* @tip Set the border for your email.*/#templateContainer{/*@editable*/ border:1px solid #BBBBBB;}/*** @tab Page* @section heading 1* @tip Set the styling for all first-level headings in your emails. These should be the largest of your headings.* @style heading 1*/h1{/*@editable*/ color:#202020 !important;display:block;/*@editable*/ font-family:Helvetica;/*@editable*/ font-size:26px;/*@editable*/ font-style:normal;/*@editable*/ font-weight:bold;/*@editable*/ line-height:100%;/*@editable*/ letter-spacing:normal;margin-top:0;margin-right:0;margin-bottom:10px;margin-left:0;/*@editable*/ text-align:left;}/*** @tab Page* @section heading 2* @tip Set the styling for all second-level headings in your emails.* @style heading 2*/h2{/*@editable*/ color:#404040 !important;display:block;/*@editable*/ font-family:Helvetica;/*@editable*/ font-size:20px;/*@editable*/ font-style:normal;/*@editable*/ font-weight:bold;/*@editable*/ line-height:100%;/*@editable*/ letter-spacing:normal;margin-top:0;margin-right:0;margin-bottom:10px;margin-left:0;/*@editable*/ text-align:left;}/*** @tab Page* @section heading 3* @tip Set the styling for all third-level headings in your emails.* @style heading 3*/h3{/*@editable*/ color:#606060 !important;display:block;/*@editable*/ font-family:Helvetica;/*@editable*/ font-size:16px;/*@editable*/ font-style:italic;/*@editable*/ font-weight:normal;/*@editable*/ line-height:100%;/*@editable*/ letter-spacing:normal;margin-top:0;margin-right:0;margin-bottom:10px;margin-left:0;/*@editable*/ text-align:left;}/*** @tab Page* @section heading 4* @tip Set the styling for all fourth-level headings in your emails. These should be the smallest of your headings.* @style heading 4*/h4{/*@editable*/ color:#808080 !important;display:block;/*@editable*/ font-family:Helvetica;/*@editable*/ font-size:14px;/*@editable*/ font-style:italic;/*@editable*/ font-weight:normal;/*@editable*/ line-height:100%;/*@editable*/ letter-spacing:normal;margin-top:0;margin-right:0;margin-bottom:10px;margin-left:0;/*@editable*/ text-align:left;}/*==========Header Styles==========*//*** @tab Header* @section preheader style* @tip Set the background color and bottom border for your email\'s preheader area.* @theme header*/#templatePreheader{/*@editable*/ background-color:#F4F4F4;/*@editable*/ border-bottom:1px solid #CCCCCC;}/*** @tab Header* @section preheader text* @tip Set the styling for your email\'s preheader text. Choose a size and color that is easy to read.*/.preheaderContent{/*@editable*/ color:#808080;/*@editable*/ font-family:Helvetica;/*@editable*/ font-size:10px;/*@editable*/ line-height:125%;/*@editable*/ text-align:left;}/*** @tab Header* @section preheader link* @tip Set the styling for your email\'s preheader links. Choose a color that helps them stand out from your text.*/.preheaderContent a:link, .preheaderContent a:visited, /* Yahoo! Mail Override */ .preheaderContent a .yshortcuts /* Yahoo! Mail Override */{/*@editable*/ color:#606060;/*@editable*/ font-weight:normal;/*@editable*/ text-decoration:underline;}/*** @tab Header* @section header style* @tip Set the background color and borders for your email\'s header area.* @theme header*/#templateHeader{/*@editable*/ background-color:#F4F4F4;/*@editable*/ border-top:1px solid #FFFFFF;/*@editable*/ border-bottom:1px solid #CCCCCC;}/*** @tab Header* @section header text* @tip Set the styling for your email\'s header text. Choose a size and color that is easy to read.*/.headerContent{/*@editable*/ color:#505050;/*@editable*/ font-family:Helvetica;/*@editable*/ font-size:20px;/*@editable*/ font-weight:bold;/*@editable*/ line-height:100%;/*@editable*/ padding-top:0;/*@editable*/ padding-right:0;/*@editable*/ padding-bottom:0;/*@editable*/ padding-left:0;/*@editable*/ text-align:left;/*@editable*/ vertical-align:middle;}/*** @tab Header* @section header link* @tip Set the styling for your email\'s header links. Choose a color that helps them stand out from your text.*/.headerContent a:link, .headerContent a:visited, /* Yahoo! Mail Override */ .headerContent a .yshortcuts /* Yahoo! Mail Override */{/*@editable*/ color:#f15a29;/*@editable*/ font-weight:normal;/*@editable*/ text-decoration:underline;}#headerImage{height:auto;max-width:600px;}/*==========Body Styles==========*//*** @tab Body* @section body style* @tip Set the background color and borders for your email\'s body area.*/#templateBody{/*@editable*/ background-color:#F4F4F4;/*@editable*/ border-top:1px solid #FFFFFF;/*@editable*/ border-bottom:1px solid #CCCCCC;}/*** @tab Body* @section body text* @tip Set the styling for your email\'s main content text. Choose a size and color that is easy to read.* @theme main*/.bodyContent{/*@editable*/ color:#505050;/*@editable*/ font-family:Helvetica;/*@editable*/ font-size:14px;/*@editable*/ line-height:150%;padding-top:20px;padding-right:20px;padding-bottom:20px;padding-left:20px;/*@editable*/ text-align:left;}/*** @tab Body* @section body link* @tip Set the styling for your email\'s main content links. Choose a color that helps them stand out from your text.*/.bodyContent a:link, .bodyContent a:visited, /* Yahoo! Mail Override */ .bodyContent a .yshortcuts /* Yahoo! Mail Override */{/*@editable*/ color:#f15a29;/*@editable*/ font-weight:normal;/*@editable*/ text-decoration:underline;}.bodyContent img{display:inline;height:auto;max-width:560px;}/*==========Footer Styles==========*//*** @tab Footer* @section footer style* @tip Set the background color and borders for your email\'s footer area.* @theme footer*/#templateFooter{/*@editable*/ background-color:#F4F4F4;/*@editable*/ border-top:1px solid #FFFFFF;}/*** @tab Footer* @section footer text* @tip Set the styling for your email\'s footer text. Choose a size and color that is easy to read.* @theme footer*/.footerContent{/*@editable*/ color:#808080;/*@editable*/ font-family:Helvetica;/*@editable*/ font-size:10px;/*@editable*/ line-height:150%;padding-top:20px;padding-right:20px;padding-bottom:20px;padding-left:20px;/*@editable*/ text-align:left;}/*** @tab Footer* @section footer link* @tip Set the styling for your email\'s footer links. Choose a color that helps them stand out from your text.*/.footerContent a:link, .footerContent a:visited, /* Yahoo! Mail Override */ .footerContent a .yshortcuts, .footerContent a span /* Yahoo! Mail Override */{/*@editable*/ color:#606060;/*@editable*/ font-weight:normal;/*@editable*/ text-decoration:underline;}/* /\/\/\/\/\/\/\/\/ MOBILE STYLES /\/\/\/\/\/\/\/\/ */ @media only screen and (max-width: 480px){/* /\/\/\/\/\/\/ CLIENT-SPECIFIC MOBILE STYLES /\/\/\/\/\/\/ */body, table, td, p, a, li, blockquote{-webkit-text-size-adjust:none !important;}/* Prevent Webkit platforms from changing default text sizes */ body{width:100% !important; min-width:100% !important;}/* Prevent iOS Mail from adding padding to the body *//* /\/\/\/\/\/\/ MOBILE RESET STYLES /\/\/\/\/\/\/ */#bodyCell{padding:10px !important;}/* /\/\/\/\/\/\/ MOBILE TEMPLATE STYLES /\/\/\/\/\/\/ *//*========Page Styles========*//*** @tab Mobile Styles* @section template width* @tip Make the template fluid for portrait or landscape view adaptability. If a fluid layout doesn\'t work for you, set the width to 300px instead.*/#templateContainer{max-width:600px !important;/*@editable*/ width:100% !important;}/*** @tab Mobile Styles* @section heading 1* @tip Make the first-level headings larger in size for better readability on small screens.*/h1{/*@editable*/ font-size:24px !important;/*@editable*/ line-height:100% !important;}/*** @tab Mobile Styles* @section heading 2* @tip Make the second-level headings larger in size for better readability on small screens.*/h2{/*@editable*/ font-size:20px !important;/*@editable*/ line-height:100% !important;}/*** @tab Mobile Styles* @section heading 3* @tip Make the third-level headings larger in size for better readability on small screens.*/h3{/*@editable*/ font-size:18px !important;/*@editable*/ line-height:100% !important;}/*** @tab Mobile Styles* @section heading 4* @tip Make the fourth-level headings larger in size for better readability on small screens.*/h4{/*@editable*/ font-size:16px !important;/*@editable*/ line-height:100% !important;}#templatePreheader{display:none !important;}#headerImage{height:auto !important;max-width:600px !important;width:100% !important;}.headerContent{font-size:20px !important;line-height:125% !important;}.bodyContent{font-size:18px !important;line-height:125% !important;}.footerContent{font-size:14px !important;line-height:115% !important;}.footerContent a{display:block !important;}}</style> </head> <body leftmargin="0" marginwidth="0" topmargin="0" marginheight="0" offset="0"> <center> <table align="center" border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="bodyTable"> <tr> <td align="center" valign="top" id="bodyCell"> <table border="0" cellpadding="0" cellspacing="0" id="templateContainer"> <tr> <td align="center" valign="top"> <table border="0" cellpadding="0" cellspacing="0" width="100%" id="templatePreheader"> <tr> <td valign="top" class="preheaderContent" style="padding-top:10px; padding-right:20px; padding-bottom:10px; padding-left:20px;" mc:edit="preheader_content00"> Your Trust1Connector download is ready! </td><td valign="top" width="180" class="preheaderContent" style="padding-top:10px; padding-right:20px; padding-bottom:10px; padding-left:0;" mc:edit="preheader_content01"> Email not displaying correctly?<br/><a href="*|ARCHIVE|*" target="_blank">View it in your browser</a>. </td></tr></table> </td></tr><tr> <td align="center" valign="top"> <table border="0" cellpadding="0" cellspacing="0" width="100%" id="templateBody"> <tr> <td valign="top" class="bodyContent" mc:edit="body_content"> <h1>Hello!</h1> You (or someone using your email address) has requested to download Trust1Connector, the software component that is required for using <a href="http://www.readmycards.eu">ReadMyCards.eu</a>. <br/> <br/> Click the link below to start your download. <br/> <br/> <a href="' + link + '"><h2>Download Trust1Connector (' + platform + ')</h2></a> <br/>Once the download is completed, just run the downloaded file to install the component. The install wizard will run you through the process.<br /> <br /> If you did not request a download, you can safely ignore this email. <br/> <br/> Best regards, <br/> The ReadMyCards team </td></tr></table> </td></tr><tr> <td align="center" valign="top"> <table border="0" cellpadding="0" cellspacing="0" width="100%" id="templateFooter"> <tr style="padding-top: 0;"> <td valign="top" class="footerContent" style="padding-top:10px;padding-bottom:0px;" mc:edit="footer_content01"> <em>Copyright &copy; 2016 Trust1Team, All rights reserved.</em> </td></tr><tr> <td valign="top" class="footerContent" style="padding-top:5px; padding-bottom:10px;" mc:edit="footer_content00"> <a href="http://www.readmycards.eu">ReadMyCards</a>&nbsp;&nbsp;&nbsp;<a href="http://www.trust1connector.com">Trust1Connector</a>&nbsp;&nbsp;&nbsp;<a href="http://www.trust1team.com">Trust1Team</a>&nbsp; </td></tr></table> </td></tr></table> </td></tr></table> </center> </body></html>';
}
