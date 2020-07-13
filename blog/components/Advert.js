import "../less/Advert.less"
import { Affix } from "antd"
const Advert = () => {
    return (
        <>
             <Affix offsetTop={50}>
                <div className="ad-div comm-box">
                    <div><img src="/static/img/flutter_ad2.jpg" width="100%" /></div>
                    <div><img src="/static/img/flutter_ad2.jpg" width="100%" /></div>
                
                </div>
            </Affix>
        </>
    )
 }

 export default Advert