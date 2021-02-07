module.exports = (sequelize, Sequelize) => {   
    const MoneyGram_acc_dtls = sequelize.define("rmt_moneyGram_acc_dtls",
    {     
        tr_id: {       
          type: Sequelize.INTEGER,       
          unique: true,       
          primaryKey: true,       
          autoIncrement: true    
        },     
        file_id: {       
          type: Sequelize.INTEGER     
        },     
        tr_type: {       
          type: Sequelize.STRING     
        },     
        tr_date: {       
          type: Sequelize.STRING     
        },     
        currency_code: {       
          type: Sequelize.STRING     
        },     
        tt_no: {       
          type: Sequelize.STRING     
        },     
        debit_account: {       
          type: Sequelize.STRING     
        },     
        debit_status: {       
          type: Sequelize.STRING     
        },     
        credit_account: {       
          type: Sequelize.STRING     
        },     
        credit_status: {       
          type: Sequelize.STRING     
        },     
        narration: {       
          type: Sequelize.STRING     
        },     
        CBS_ref_no: {       
          type: Sequelize.STRING     
        },     
        time_stamp: {       
          type: Sequelize.STRING     
        },     
        status: {       
          type: Sequelize.TEXT     
        },     
        user_id: {       
          type: Sequelize.STRING     
        },     
        time_stamp: {       
          type: Sequelize.STRING     
        },     
        transaction_amount: {       
          type: Sequelize.DOUBLE     
        },     
        incentive_amount: {       
          type: Sequelize.DOUBLE     
        },     
        total_amount: {       
          type: Sequelize.DOUBLE     
        },     
        transaction_method: {       
          type: Sequelize.INTEGER     
        }   
      });   
      return MoneyGram_acc_dtls; 
    };
  