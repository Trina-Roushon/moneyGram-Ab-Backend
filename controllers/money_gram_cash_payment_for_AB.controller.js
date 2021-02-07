const db = require("../models");
const MoneyGram_cash_api = db.rmt_moneyGram_cash_api;
const MoneyGram_acc_dtls = db.rmt_moneyGram_acc_dtls;
const { QueryTypes, json } = require('sequelize');
const requestPromise = require("request-promise");
var express = require('express');
var app = express();
var soap = require('soap');

var CryptoJS = require("crypto-js");
// var encrypttext = '58BDD30F7F356D907D03320ED05328FDE0A7699A0DBB1918F99ACE29DFECC5DB5BA229D788ED963EE08A3268422A33940E801ED46877D2CAD1180E2DC1480CDEAD4C4D68FD7793FE506C498A86E735BC514EDB14F48DFBD84F6D05851311A6EE527A8D376984036060E71FF82114388AD7CF15515D8FA69FB7DBB4567D300430C719740693B26B4827C052AD8F1E2892FF746FCF8BB9F8BD7AA0AC233573DBEB94E333BACEE3CCED05F614A65F6C6822FD0A1E026E64188C3BE3CD43D652E509';
var aes256 = require('aes256');
  //post or insert file value // verify button
  exports.create = async (req, res) => {

    
 
    var key = 'MyEncryptionKeyERA_AGENT_BANKING';
    var plaintext = '58BDD30F7F356D907D03320ED05328FDE0A7699A0DBB1918F99ACE29DFECC5DB5BA229D788ED963EE08A3268422A33940E801ED46877D2CAD1180E2DC1480CDEAD4C4D68FD7793FE506C498A86E735BC514EDB14F48DFBD84F6D05851311A6EE527A8D376984036060E71FF82114388AD7CF15515D8FA69FB7DBB4567D300430C719740693B26B4827C052AD8F1E2892FF746FCF8BB9F8BD7AA0AC233573DBEB94E333BACEE3CCED05F614A65F6C6822FD0A1E026E64188C3BE3CD43D652E509';

//     var encrypted = aes256.encrypt(key, plaintext);
// var decrypted = aes256.decrypt(key, encrypted);
     
    var cipher = aes256.createCipher(key);
     
    var encrypted = cipher.encrypt(plaintext);
    var decrypted = cipher.decrypt(encrypted);
    var decrypted_Data = cipher.decrypt(plaintext);
console.log(cipher,'1,...', encrypted,'2,...', decrypted, '3..............',decrypted_Data)



var data = {
  "AGENT_AC_NO":"1082259000001",
  "POINT_ID":2,
  "COMPANY_ID":57,
  "ABS_BRANCH_CODE":"108",
  "ABS_SESSION_ID":"123456",
  "ABS_LOG_ID":100,
  "ABS_USER_ID":"MUNNUR25"
  };
  // Encrypt
var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), 'MyEncryptionKeyERA_AGENT_BANKING').toString();
 console.log(ciphertext, 'encrypt_ciphertexttt');

    // Decrypt
    var bytes  = CryptoJS.AES.decrypt(ciphertext, 'MyEncryptionKeyERA_AGENT_BANKING').toString(CryptoJS.enc.Utf8);
    var decryptedData = JSON.parse(bytes);
    console.log(ciphertext, bytes, decryptedData, 'tri..[{id: 1}, {id: 2}]'); // [{id: 1}, {id: 2}]

    var refno = req.body.refno;
    let final_ex_house_code = 12;
    let caller_id = 'EREMIT';

     try{
    var url = 'http://103.17.69.63/eRemitWebPayMG/services/CashPaymentAPImg?wsdl';
    var args = {
        ExhouseCode: final_ex_house_code,
        refno: refno,
        caller_id: caller_id,
        //branch_code:'111'
    };
      soap.createClient(url, function (err, client) {
          client.payTxnCheckMG(args, function (err, result) {
            res.send(result.payTxnCheckMGReturn);
            console.log(result.payTxnCheckMGReturn, 'payTxnCheckMG');

            var tr_date = new Date();
            var dd = String(tr_date.getDate()).padStart(2, '0');
            var mm = String(tr_date.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = tr_date.getFullYear();
            tr_date = yyyy + '-' + mm + '-' + dd;
            console.log(tr_date, 'tr_dateeeeeeeeeee');
  
              let final_val = {
                TT_No: refno,
                tr_date: tr_date,
                ExhouseCode: final_ex_house_code,
                caller_id: caller_id,
                agentCheckAmount: result.payTxnCheckMGReturn.agentCheckAmount,  
                agentCheckNumber: result.payTxnCheckMGReturn.agentCheckNumber,  
                agent_session_id: result.payTxnCheckMGReturn.agent_session_id,   
                code: result.payTxnCheckMGReturn.code,
                confirm_id: result.payTxnCheckMGReturn.confirm_id,
                customerCheckAmount: result.payTxnCheckMGReturn.customerCheckAmount,
                customerCheckNumber: result.payTxnCheckMGReturn.customerCheckNumber,
                payTxnCheckMG_message: result.payTxnCheckMGReturn.message,
                paid_by: result.payTxnCheckMGReturn.paid_by,
                paid_date: result.payTxnCheckMGReturn.paid_date,
                pay_token_id: result.payTxnCheckMGReturn.pay_token_id,
                payment_type: result.payTxnCheckMGReturn.payment_type,
                payout_amount: result.payTxnCheckMGReturn.payout_amount,
                payout_currency: result.payTxnCheckMGReturn.payout_currency,
                receiver_address: result.payTxnCheckMGReturn.receiver_address,
                receiver_country: result.payTxnCheckMGReturn.receiver_country,
                receiver_name: result.payTxnCheckMGReturn.receiver_name,
                refno: result.payTxnCheckMGReturn.refno,
                payTxnCheckMG_response_code: result.payTxnCheckMGReturn.response_code,
                send_agent: result.payTxnCheckMGReturn.send_agent,
                sender_address: result.payTxnCheckMGReturn.sender_address,
                sender_city: result.payTxnCheckMGReturn.sender_city,
                sender_country: result.payTxnCheckMGReturn.sender_country,
                sender_dob: result.payTxnCheckMGReturn.sender_dob,
                sender_id: result.payTxnCheckMGReturn.sender_id,
                sender_mobile: result.payTxnCheckMGReturn.sender_mobile,
                sender_name: result.payTxnCheckMGReturn.sender_name,
                sender_nationality: result.payTxnCheckMGReturn.sender_nationality,
                sender_type: result.payTxnCheckMGReturn.sender_type,
                txn_date: result.payTxnCheckMGReturn.txn_date,
                Branch: req.body.BranchName,
                branchCode: req.body.BranchCode,
                user_id: req.body.user_id,
                status: 'Verified' //result.payTxnCheckMGReturn.status,//but no status there!
              }
    // MoneyGram_cash_api.create(final_val)
    //   .then(data => {
    //     console.log(data, 'Data insert val');
    //     })
    //     .catch(err => {
    //      // res.status(500).send({ message:err.message || "Some error occurred." });
    //   });  
    });
  });
} 
catch (err) { 
  next(err, 'payTxnCheckMG error'); 
  }
};


//post or insert Accounts
exports.account = async (req, res) => {
    let Confirm_res;
    let nrtdata ;
    let incentiveDebitData ;
    let GLDebitData;

    var tr_date = new Date();
    var dd = String(tr_date.getDate()).padStart(2, '0');
    var mm = String(tr_date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = tr_date.getFullYear();
    tr_date = yyyy + '-' + mm + '-' + dd;
    console.log(tr_date, 'tr_dateeeeeeeeeee');

    let incomming_data = req.body;
    console.log(incomming_data, 'incomming_data');
    let TT_No = incomming_data.refno;

    let streetAddress = incomming_data.streetAddress;
    let city = incomming_data.city;
    let reciverCitizenshipCountry = incomming_data.reciverCitizenshipCountry;
    let birthCountry = incomming_data.birthCountry;
    let dateOfBirth = incomming_data.dateOfBirth;
    let gender = incomming_data.gender;
    let phoneCountryCode = '880';
    let phoneNo = incomming_data.phoneNo;
    let identificationType = incomming_data.identificationType;
    let identificationNo = incomming_data.identificationNo;
    let idIssueCountry = incomming_data.idIssueCountry;
    let issueDate = incomming_data.issueDate;
    let expiredDate = incomming_data.expiredDate;
    let occupation = incomming_data.occupation;
    let relationship = incomming_data.relationship;
    let purpose = incomming_data.purpose;
    let purposeMG = incomming_data.purposeMG;
    let status = 'In progress';
    let sender_name = incomming_data.sender_name;
    let sender_country = incomming_data.sender_country;
    let sender_mobile = incomming_data.sender_mobile;
    let payout_currency = incomming_data.payout_currency;
    let receiver_name = incomming_data.receiver_name;
    let payout_amount = incomming_data.payout_amount;
    let user_id = incomming_data.user_id;
    let ExhouseName = incomming_data.ExhouseName;
    let agentCheckAmount = incomming_data.soapData.agentCheckAmount;
    let agentCheckNumber = incomming_data.soapData.agentCheckNumber;
    let customerCheckNumber = incomming_data.soapData.customerCheckNumber;
    let customerCheckAmount = incomming_data.soapData.customerCheckAmount;
    let pay_token_id = incomming_data.soapData.pay_token_id
    let amount = incomming_data.payout_amount;
    let incentiveAmount = incomming_data.incentiveAmount;
    let totalAmount = incomming_data.totalAmount;

 //data insert/update
  try{
    await  MoneyGram_cash_api.update({
        streetAddress : streetAddress, 
        city : city, 
        reciverCitizenshipCountry: reciverCitizenshipCountry, 
        birthCountry: birthCountry, 
        dateOfBirth: dateOfBirth, 
        gender: gender, 
        phoneCountryCode: phoneCountryCode,
        phoneNo: phoneNo, 
        identificationType: identificationType, 
        identificationNo: identificationNo, 
        idIssueCountry: idIssueCountry,
        issueDate: issueDate, 
        expiredDate: expiredDate, 
        occupation: occupation,
        relationship: relationship,
        purpose: purpose, 
        purposeMG: purposeMG, 
        status: status,
        sender_name: sender_name,//incomming_data.sender_name,
        sender_country: sender_country,//incomming_data.sender_country,
        sender_mobile: sender_mobile,//incomming_data.sender_mobile,
        payout_currency: payout_currency,//incomming_data.payout_currency,
        receiver_name: receiver_name,// incomming_data.receiver_name,
        payout_amount: payout_amount,//incomming_data.payout_amount,
        amount: amount,
        incentiveAmount: incentiveAmount,
        totalAmount: totalAmount
       },{ where : { TT_No : TT_No }}) 
  }
  catch (err) {
  }

  //payTxnConfirm
  try {
    var url = 'http://103.17.69.63/eRemitWebPayMG/services/CashPaymentAPImg?wsdl';
    var args = {
      ExhouseCode: ExhouseName,
      refno: TT_No,
      pay_token_id: pay_token_id,
      operator_id: user_id,
      receiverAddress: streetAddress,
      receiverCity: city,
      receiverCountry: 'BGD',
      receiverPhotoIdType: identificationType,
      receiverPhotoIdNumber: identificationNo,
      receiverPhotoIdCountry: idIssueCountry,
      receiverDOB: dateOfBirth,
      receiverBirthCountry: birthCountry,
      receiverPhone: phoneNo,
      receivePurposeOfTransaction: purpose,
      relationshipToSender: relationship,
      receiverGender: gender,
      receiverPhoneCountryCode: phoneCountryCode,
      receiverOccupation: occupation,
      receiverIdIssueDate: issueDate,
      receiverIdExpiredDate: expiredDate,
      receiverCurrency: 'Banladeshi Taka',
      agentCheckNumber: agentCheckNumber,
      agentCheckAmount: agentCheckAmount,
      customerCheckNumber: customerCheckNumber,
      customerCheckAmount: customerCheckAmount,
      receiverIntendedUseOfMGIServices: purposeMG,
      amount: payout_amount,
      citizenshipCountry: reciverCitizenshipCountry,
    };
    soap.createClient(url, function (err, client) {
      client.payTxnConfirmMG(args, function (err, result) {
        Confirm_res = result.payTxnConfirmMGReturn;
        res.send(result.payTxnConfirmMGReturn);
        console.log(Confirm_res,result, 'cccccccccccccccccccccccc');
        let response_code = result.payTxnConfirmMGReturn.response_code; 
        let Confirm_message = result.payTxnConfirmMGReturn.message;
        // if (response_code == 0) {
        //     MoneyGram_cash_api.update({ status: 'Transaction Confirmed', payTxnConfirm_message: Confirm_message, payTxnConfirm_response_code: response_code }, { where: { TT_No: TT_No } });
        //   }
        //   else{
        // //if (response_code == 1)
        //     MoneyGram_cash_api.update({ status: 'Confirm Pending', payTxnConfirm_message: Confirm_message, payTxnConfirm_response_code: response_code }, { where: { TT_No: TT_No } });
        //   }
        });
    });      
} 
catch (err) {
 console.log(err, 'payTxnConfirm Error!!');
}

//CBS TREANSACTION API
try{
    var values=[];
    var Data = {
      frd_br_code: "111",
      cash_pay_branch: "111",// cash.Branch,
      exhouse_acc: "11191000023",
      payment_from: "N",//G
      exhouse_acc_type: "C30",
      cash_gl: "20750-48",
      incentive_gl: "24100-79",
      amount: 200,// incomming_data.amount,
      incentive_amount: 20,// incomming_data.incentiveAmount,
      total_amount: 220,//incomming_data.totalAmount,
      narration: "Remittance Cash Payment of ",
      incentive_narration: "Remittance Cash Payment of ",
      office_id: "S00459",
      user_id: incomming_data.user_id
    }
    const options = {
      method: 'POST',
      uri: 'http://10.11.201.37:5000/web-cash-payment',
      body: Data,
      json: true,
    }
   await requestPromise(options).then(function (response){
      values.push(response);
      console.log(response,"**web-cash-payment" );
    })
    .catch(function (err) {
      res.send(err);
      console.log(err,"error");
    })
    let val = values;      
        for (let i = 0; i < val.length; i++) {
          let resdata= 'Transaction Completed'; 
          let resCode= val[i]['response code'];
          let ttNo = incomming_data.refno;
          let CBS_response_status= val[i]['response status'];
          if(resCode === 0){
            await MoneyGram_cash_api.update({ status : resdata , CBS_response_code : resCode, CBS_response_status: CBS_response_status},{ where : { TT_No : ttNo }})
                        const nrtDebit = {
                            file_id:  1,
                            tr_type : 'CASH',
                            tr_date : tr_date, 
                            currency_code : 'BDT',
                            tt_no : incomming_data.refno,
                            debit_account : '11191000027', 
                            debit_status: 'D',
                            credit_account : '20750-49',
                            credit_status: 'C',
                            narration : 'narration',
                            CBS_ref_no : '36',
                            time_stamp : '44',
                            status : 'Y',
                            user_id :  incomming_data.user_id,
                            transaction_amount : Data.amount,
                            incentive_amount : Data.incentive_amount,
                            total_amount : Data.total_amount ,
                            transaction_method : 2,
                        };
                        const incentiveDebit = {
                          file_id:  1,
                          tr_type : 'CASH',
                          tr_date : tr_date, 
                          currency_code : 'BDT',
                          tt_no : incomming_data.refno,
                          debit_account : '24100-79', 
                          debit_status:  'D',
                          credit_account : '20750-49',
                          credit_status: 'C',
                          narration : 'narration',
                          CBS_ref_no : '36',
                          time_stamp : '44',
                          status : 'Y', 
                          user_id :  incomming_data.user_id,
                          transaction_amount : Data.incentive_amount,
                          incentive_amount : Data.incentive_amount,
                          total_amount : Data.total_amount,
                          transaction_method : 2,
                        };
                        const GLDebit = {
                          file_id:  1,
                          tr_type : 'CASH',
                          tr_date : tr_date, 
                          currency_code : 'BDT',
                          tt_no : incomming_data.refno,
                          debit_account : '20750-49', 
                          debit_status:  'D',
                          credit_account : '111',
                          credit_status: 'C',
                          narration : 'narration',
                          CBS_ref_no : '36',
                          time_stamp : '44',
                          status : 'Y',
                          user_id :  incomming_data.user_id,
                          transaction_amount : Data.total_amount,
                          incentive_amount : Data.incentive_amount,
                          total_amount : Data.total_amount,
                          transaction_method : 2,
                        };
                          await MoneyGram_acc_dtls.create( nrtDebit).then(data => {
                            nrtdata = data;
                            //console.log(nrtdata,"datata")
                          })
                          .catch(err => { 
                            console.log(err,"errrrrrr") 
                          });
                          await MoneyGram_acc_dtls.create( incentiveDebit).then(data => { 
                            incentiveDebitData = data;
                            //console.log(data,"dttatata")
                          })
                          .catch(err => { 
                            console.log(err,"errrrrrr") 
                          });
                          await MoneyGram_acc_dtls.create( GLDebit).then(data => { 
                            GLDebitData = data;
                            //console.log(data,"datataat")
                          })
                          .catch(err => { 
                            console.log(err,"errrrrrr") 
                          });
                        }
                        else{
                          await MoneyGram_cash_api.update({ status : 'Transaction failed', CBS_response_code : resCode, CBS_response_status: CBS_response_status},{ where : { TT_No : ttNo }})
                            console.log('Response code missing last');
                        } 
                    }
                }
                catch (err) {
                    console.log(err,'CBS Error');
                }
};