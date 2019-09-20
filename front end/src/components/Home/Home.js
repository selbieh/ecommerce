import React,{Component} from 'react';

import TopSeller from './TopSeller/TopSeller';
import NewlyLunched from './NewlyLunched/NewlyLunched';

class Home extends Component {


    render() {

        return (
            <React.Fragment>
                <TopSeller {...this.props}/>
                <NewlyLunched  {...this.props}/>
            </React.Fragment>
            
         
        );
    }
}

export default Home;