import React, { Component } from 'react';


class productDetails extends Component {
    state = { 
        product:{}
     }
    render() {
        return (
            <div>
                <div>
                    <div>
                        <img src='http://127.0.0.1:8000/media/offices/office_test1/1/3.jpg' alt='hi'  style={{width:'30%',height:'auto',border:'0px'}}/>
                    </div>
                    <div>
                        <p>name</p>
                        <p>لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود تيمبور
 
                                أنكايديديونتيوت لابوري ات دولار ماجنا أليكيوا . يوت انيم أد مينيم فينايم,كيواس نوستريد
                                
                                أكسير سيتاشن يللأمكو لابورأس نيسي يت أليكيوب أكس أيا كوممودو كونسيكيوات . ديواس</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default productDetails;