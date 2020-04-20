import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { RootState } from '../../redux/index';
import { getAllAds,getAllSales } from '../../redux/modules/ads';
import {TransactionTile} from '../../components/transactions/index';
import {BuyContainer} from './../../components/buy';

class AdvertisementsPage extends React.Component<{loginUser:any,user:any,history:any,getAllSales: any,ads:any}>{
  state = { 
    user: null,
    ads: null,
    height: true
  };

  componentWillMount(){
    this.props.getAllSales()
    console.log(this.props)
  }

  render(){
      const {height} = this.state
    return (
      <>
        <div className="App">
          <p onClick={()=>this.setState({height:!height})}>Trending Sale Requests</p>
            <div className="estimate-container" style={{display:height?'none':'block'}}>
                <BuyContainer ad={()=>{}} user={this.props.user}/> 
            </div>
          {
            !this.props.ads.sales.loading && 
            <TransactionTile ads={this.props.ads.sales.sales}  type={'sale'}/>
          }
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
      getAllSales
    },
    dispatch
  );
};

const Advertisements = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdvertisementsPage);

export default Advertisements;