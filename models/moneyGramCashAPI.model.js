module.exports = (sequelize, Sequelize) => {   
    const MoneyGram_cash_api = sequelize.define("rmt_moneyGram_cash_api",
    {   
        TT_No: {       
          type: Sequelize.STRING,       
          unique: true,       
          allowNull: false,           
        },    
        tr_date: {       
          type: Sequelize.STRING,            
        }, 
        amount: {       
          type: Sequelize.STRING,            
        }, 
        incentiveAmount: {       
          type: Sequelize.STRING,  
          defaultValue: 0          
        },   
        totalAmount: {       
          type: Sequelize.STRING ,  
          defaultValue: 0     
        },
        ExhouseCode: {       
          type: Sequelize.STRING,            
        }, 
        caller_id: {       
          type: Sequelize.STRING,            
        },  
        agentCheckAmount: {       
          type: Sequelize.STRING,            
        },   
        agentCheckNumber: {       
          type: Sequelize.STRING     
        }, 
        agent_session_id: {       
          type: Sequelize.STRING     
        }, 
        code: {       
          type: Sequelize.STRING     
        },      
        confirm_id: {       
          type: Sequelize.STRING     
        },     
        customerCheckAmount: {       
          type: Sequelize.STRING     
        },   
        customerCheckNumber: {       
          type: Sequelize.STRING     
        },
        paid_by: {       
          type: Sequelize.STRING     
        },     
        paid_date: {       
          type: Sequelize.STRING     
        },     
        pay_token_id: {       
          type: Sequelize.STRING     
        },     
        payment_type: {       
          type: Sequelize.STRING     
        },     
        payout_amount: {       
          type: Sequelize.STRING     
        },     
        payout_currency: {       
          type: Sequelize.STRING     
        },     
        receiver_address: {       
          type: Sequelize.STRING     
        },     
        receiver_country: {       
          type: Sequelize.STRING     
        },     
        receiver_name: {       
          type: Sequelize.STRING     
        },     
        refno: {       
          type: Sequelize.STRING     
        },     
        send_agent: {       
          type: Sequelize.STRING     
        },     
        sender_address: {       
          type: Sequelize.STRING     
        },     
        sender_city: {       
          type: Sequelize.STRING     
        },     
        sender_country: {       
          type: Sequelize.STRING     
        },     
        sender_dob: {       
          type: Sequelize.STRING     
        },     
        sender_id: {       
          type: Sequelize.STRING     
        },     
        sender_mobile: {       
          type: Sequelize.STRING     
        },     
        sender_name: {       
          type: Sequelize.STRING     
        },     
        sender_nationality: {       
          type: Sequelize.STRING     
        },     
        sender_type: {       
          type: Sequelize.STRING     
        },     
        txn_date: {       
          type: Sequelize.STRING     
        },
        //payTxnCheckMG end
        BranchName: {       
          type: Sequelize.STRING     
        },     
        BranchCode: {       
          type: Sequelize.STRING     
        },
        user_id: {
          type: Sequelize.STRING
        },
        status: {
          type: Sequelize.STRING,
          defaultValue: 'Pending',
        },
        streetAddress: {
          type: Sequelize.STRING
        },
        city: {
          type: Sequelize.STRING
        },
        reciverCitizenshipCountry:{
          type: Sequelize.STRING
        },
        birthCountry: {
          type: Sequelize.STRING
        },
        dateOfBirth:{
          type: Sequelize.STRING
        },
        gender:{
          type: Sequelize.STRING
        },
        phoneNo:{
          type: Sequelize.STRING
        },
        identificationType:{
          type: Sequelize.STRING
        },
        identificationNo:{
          type: Sequelize.STRING
        },
        idIssueCountry:{
          type: Sequelize.STRING
        },
        issueDate:{
          type: Sequelize.STRING
        },
        expiredDate:{
          type: Sequelize.STRING
        },
        occupation:{
          type: Sequelize.STRING
        },
        relationship:{
          type: Sequelize.STRING
        },
        purpose: {
          type: Sequelize.STRING
        },
        purposeMG:{
          type: Sequelize.STRING
        },
        payTxnCheckMG_message: {       
          type: Sequelize.STRING     
        },
        payTxnCheckMG_response_code: {       
          type: Sequelize.STRING     
        }, 
        CBS_response_code:{
          type: Sequelize.STRING
        },
        CBS_response_status:{
          type: Sequelize.STRING
        },
        payTxnConfirm_message:{
          type: Sequelize.STRING
        },
        payTxnConfirm_response_code:{
          type: Sequelize.STRING
        },
        ReasonOfCancel:{
          type: Sequelize.STRING
        }
      });   
      return MoneyGram_cash_api; 
    };
  