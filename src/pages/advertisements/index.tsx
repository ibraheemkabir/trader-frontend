import React from 'react';
import './transaction.scss';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { RootState } from '../../redux/index';
import { getAllAds } from '../../redux/modules/ads';
import {TransactionTile} from '../../components/transactions/index';
import {Loader} from '../../components/loader';

class AdvertisementsPage extends React.Component<{loginUser:any,user:any,history:any,getAllAds: any,ads:any}>{
  state = { 
    user: null,
    ads: null, 
  };

  componentWillMount(){
    this.props.getAllAds()
  }

  render(){
    return (
      <>
        <div className="App">
          <p>Crypto Sale Requests</p>
          {            
            this.props.ads.loading && <Loader count={10}/>
          }
          {
            !this.props.ads.loading && 
            <TransactionTile ads={this.props.ads.ads} type={'buy'}/>
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
      getAllAds
    },
    dispatch
  );
};

const Advertisements = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdvertisementsPage);

export default Advertisements;