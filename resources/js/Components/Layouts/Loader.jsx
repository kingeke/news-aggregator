import lottie from 'lottie-web/build/player/lottie_light';
import React, { Fragment, useEffect } from 'react';
import * as animationData from '../../assets/img/icons/loader.json';

function Loader({ show = true }) {

    let animationRef;

    useEffect(() => {

        let animObj = lottie.loadAnimation({
            container: animationRef,
            renderer: 'svg',
            animationData: animationData.default,
            loop: true,
        });

        if (show) {

            animObj.play();

            animObj.addEventListener('loopComplete', function () {
                let direction = animObj.playDirection == 1 ? -1 : 1;
                animObj.stop();
                animObj.setDirection(direction);
                animObj.play();
            });

        } else {

            animObj.stop();

            animObj.removeEventListener('loopComplete');
        }


    }, [show]);

    return show ?
        <div id="loading-overlay">
            <div
                ref={ref => animationRef = ref}
                style={{
                    width: 200,
                    height: 200
                }}
            >
            </div>
        </div> :
        <Fragment />;
}

export default Loader;