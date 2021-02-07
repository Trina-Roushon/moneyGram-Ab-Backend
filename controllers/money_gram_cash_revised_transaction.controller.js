const db = require("../models");
const requestPromise = require("request-promise");
const MoneyGram_cash_api = db.rmt_moneyGram_cash_api;
const MoneyGram_acc_dtls = db.rmt_moneyGram_acc_dtls;
const { QueryTypes, json, where } = require('sequelize');
var express = require('express');
var app = express();
var soap = require('soap');
const Op = require('Sequelize').Op;

exports.get = async (req, res) => {
    let searchData = req.body;
    let ExchangeHouseName = searchData.ExchangeHouseName;
    let RefNo = searchData.RefNo;
    let ReasonOfCancel = searchData.ReasonOfCancel;
    MoneyGram_cash_api.update({ ReasonOfCancel: ReasonOfCancel }, { where: { TT_No: RefNo } });
         
    console.log(searchData, 'searchDatasearchDatasearchDatasearchData');
    MoneyGram_cash_api.findAll({where:{TT_No: RefNo , payTxnConfirm_message: 'Successfully committed the transaction'}})
    .then(data => {
      res.send(data);
      console.log(data, 'MG');
    })
    .catch(err => {
      console.log(err, "Some error occurred while retrieving Data.");
    });
}

exports.reverse = async (req, res) => {
// Submit
// •	Soap PayTxnReversal
// •	Update Response and Status
// If (res == 0) {
// 	CBS API Call for MG Reversal
// 	Update with Response
// If (res == 0) {
// 	Accounting For Reversal
// }
// }
  let nrtCreditRes;
  let incentiveCreditRes;
  let GLCrebitRes;
  let TT_NO = req.body.RefNo;
  let transaction_amount = req.body.otherInfo[0].amount;
  let incentive_amount = req.body.otherInfo[0].incentiveAmount;
  let total_amount = req.body.otherInfo[0].totalAmount;

  console.log(req.body, transaction_amount, incentive_amount, total_amount, "incomming_values");

  var tr_date = new Date();
  var dd = String(tr_date.getDate()).padStart(2, '0');
  var mm = String(tr_date.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = tr_date.getFullYear();
  tr_date = yyyy + '-' + mm + '-' + dd;
  console.log(tr_date, 'tr_dateeeeeeeeeee');
  try{
  var url = 'http://103.17.69.63/eRemitWebPayMG/services/CashPaymentAPImg?wsdl';
  var args = {
    ExhouseCode:'12',
    refno:TT_NO,
    receiveReversalReason:req.body.ReasonOfCancel
};
soap.createClient(url, function (err, client) {
    client.payTxnReversalMG(args, function (err, result) {
      res.send(result.payTxnReversalMGReturn);
      let response_code = 0;//result.payTxnReversalMGReturn.response_code;
      let Confirm_message = result.payTxnReversalMGReturn.message;
      if (response_code == 0) {
          MoneyGram_cash_api.update({ status: 'Reverse Transaction Confirmed', payTxnConfirm_message: Confirm_message, payTxnConfirm_response_code: response_code }, { where: { TT_No: TT_NO } });
        
// CBS API Calling
let cbs_res_code = 0;
if(cbs_res_code == 0){
  MoneyGram_cash_api.update({ status: 'After CBS Transaction Confirmed', payTxnConfirm_message: Confirm_message, payTxnConfirm_response_code: response_code }, { where: { TT_No: TT_NO } });

  //Accounting 
       MoneyGram_acc_dtls.update({
        file_id: 1, 
        tr_type : 'CASH', 
        tr_date : tr_date,
        currency_code : 'BDT',
        tt_no : TT_NO,
        debit_account : '20750-49', 
        debit_status: 'D',
        credit_account : '11191000027', 
        credit_status: 'C',
        narration : 'narration', 
        CBS_ref_no : '36',
        time_stamp : '44', 
        status : 'Y', 
        user_id :  req.body.user_id,
        transaction_amount : transaction_amount, 
        incentive_amount : incentive_amount,
        total_amount : total_amount, 
        transaction_method : 2
      },
        { where: {tt_no: TT_NO, debit_account: '11191000027', credit_account: '20750-49'} }).then(data => {
        nrtCreditRes = data;
        console.log(nrtCreditRes,"datata1")
      })
      .catch(err => { 
        console.log(err,"errrrrrr") 
      });
       MoneyGram_acc_dtls.update({
        file_id: 1,
        tr_type : 'CASH',
        tr_date : tr_date,
        currency_code : 'BDT',
        tt_no : TT_NO,
        debit_account : '20750-49',
        debit_status: 'D',
        credit_account : '24100-79',
        credit_status: 'C',
        narration : 'narration',
        CBS_ref_no : '36',
        time_stamp : '44',
        status : 'Y',
        user_id :  req.body.user_id,
        transaction_amount : transaction_amount,
        incentive_amount : incentive_amount,
        total_amount : total_amount,
        transaction_method : 2
      },
        { where: {tt_no: TT_NO, debit_account: '24100-79', credit_account: '20750-49'} }).then(data => { 
        incentiveCreditRes = data;
        console.log(incentiveCreditRes,"dttatata2")
      })
      .catch(err => { 
        console.log(err,"errrrrrr") 
      });
       MoneyGram_acc_dtls.update({
        file_id: 1,
        tr_type : 'CASH',
        tr_date : tr_date,
        currency_code : 'BDT',
        tt_no : TT_NO,
        debit_account : '111',
        debit_status: 'D',
        credit_account : '20750-49',
        credit_status: 'C',
        narration : 'narration',
        CBS_ref_no : '36',
        time_stamp : '44',
        status : 'Y',
        user_id :  req.body.user_id,
        transaction_amount : transaction_amount,
        incentive_amount : incentive_amount,
        total_amount : total_amount,
        transaction_method : 2
      },
        { where: {tt_no: TT_NO, debit_account: '20750-49', credit_account: '111'} }).then(data => { 
        GLCrebitRes = data;
        console.log(GLCrebitRes,"datataat3")
      })
      .catch(err => { 
        console.log(err,"errrrrrr") 
      });
    
    }
  else{
  console.log("CBS Error");
      }
  }
else{
 console.log('Error payTxnReversalMGReturn');
    }
 console.log(result.payTxnReversalMGReturn, 'payTxnReversalMGReturn');
    });
  });
} 
catch (err) {
 console.log(err, 'payTxnReversalMGReturn Error!!');
  }   
}