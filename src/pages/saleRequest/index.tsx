import React,{useState} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { RootState } from '../../redux/index';
import { getAllAds,getAllSales,addSale } from '../../redux/modules/ads';
import {TransactionTile} from '../../components/transactions/index';
import {BuyContainer} from './../../components/buy';
import {InputGroupAddon} from './../../components/inputGroup';
import {SelectGroupAddon} from './../../components/selectGroup';
const {ThemedButton,Row,ListItem} = require('unifyre-web-wallet-components');

function Form (props:any) {
    const [active,setActive]=useState(true);
    const [amount, setAmount] = useState(0);
    const [cost, setCost] = useState(0);
    const [minimum, setMinimum] = useState(0);
    const [amountValue, setamountValue] = useState('');
    const [costValue, setcostValue] = useState('');
    const [prefValue, setprefValue] = useState('');

    const chooseItem = (value:any) => {    
        setamountValue(value)
    };

    const choosePrefType = (value:any) => {    
        setprefValue(value)
    };

    const setcostItem = (value:any) => {    
        setcostValue(value)
    };

        
    const handleSale = async()=>{
        const {user} = props;
        console.log(cost,costValue,amount,amountValue,prefValue);
        let data = {
            "user_id":user.unifyreId,
            "amount":amount,
            "from_cur":amountValue,
            "to_cur":costValue,
            "price":cost,
            "active":true,
            "country":user.country,
            "accepted":[prefValue],
            "city":user.city,
            "zip":user.zip,
        }
        await props.add(data)
    }

    return (
        <div className="App">
              <div className="estimate-container" style={{display:"block"}}>
                      <InputGroupAddon 
                          placeholder={'0.001'} 
                          fieldlabel={'Amount to Buy'} 
                          options={[{value: 1, label: 'BTC'}, {value: 2, label:'ETH'}]}
                          onChange={(e:any) => setAmount(e.target.value)}
                          chooseItem={chooseItem}
                      />
                      <p></p>
                      <InputGroupAddon 
                          placeholder={'0.001'} 
                          fieldlabel={'Estimated Cost'} 
                          onChange={(e:any) => setCost(e.target.value)}
                          options={[{value: 1, label: 'NGN'}, {value: 2, label:'EUR'}]}
                          chooseItem={setcostItem}
                      />
                      <p></p>
                       <SelectGroupAddon placeholder={'Paypal'} fieldlabel={'Preferred Payment Option'}  chooseItem={choosePrefType}/>
                       <p></p>
                      <div className="btnContainer">
                          <ThemedButton onPress={()=>handleSale()} text={'Post Sale Advert'} type='primary'/>
                      </div>
              </div>
            </div>
      );
}

class AdvertisementsPage extends React.Component<{addSale:any,user:any,history:any,getAllSales: any,ads:any}>{
  state = { 
    user: null,
    ads: null,
    height: true,
    amount: 0,
    amountValue: '',
    costValue: '',
    prefValue: '',
    cost: 0,
  };

    chooseItem=(value:any)=>{   
        const setItem = (value:any) =>  this.setState({amountValue:value}); 
        setItem({amountValue:value})
    }

    setamountValue(value:any){    
        this.setState({amount:value})
    }

    setcostItem=(value:any)=>{    
        this.setState({costValue: value})
    }

    setcostValue=(value:any)=>{    
        this.setState({cost: value})
    }

    choosePrefType=(value:any)=>{    
        this.setState({prefValue:value})
    }

     
    async handleSale(){
        const {costValue,amount,amountValue,prefValue,cost} = this.state;
        console.log(cost,costValue,amount,amountValue,prefValue);
    }

  render(){
      const {height} = this.state;

    return (
      <>
       <div className="App">
           <p onClick={()=>this.setState({height:!height})}>Post Buy Request</p>
            <Form add={(v:any)=>this.props.addSale(v)} user={this.props.user}/>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  user: state.user,
  ads: state.ads
});

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    {
      getAllAds,
      getAllSales,
      addSale
    },
    dispatch
  );
};

const Advertisements = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdvertisementsPage);

export default Advertisements;