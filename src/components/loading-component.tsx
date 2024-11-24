import {CirclesWithBar, ProgressBar, ThreeCircles} from "react-loader-spinner";

export type LoadingComponentType = 'circles_with_bar'|'progress_bar'|'three_circles';

interface Props {
    type_loading: LoadingComponentType;
}

export default function LoadingComponent({type_loading,}: Props) {

    return (
        <>
            {type_loading === 'circles_with_bar' &&
                <CirclesWithBar
                    height="70"
                    width="70"
                    color="#4fa94d"
                    outerCircleColor="#03DAC5"
                    innerCircleColor="#03DAC5"
                    barColor="#FFFFFF"
                    ariaLabel="circles-with-bar-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                />
            }
            {type_loading === 'progress_bar' &&
                <ProgressBar
                    visible={true} // Mostrar la barra
                    height="100" // Altura de la barra
                    width="100" // Ancho de la barra
                    barColor="#ffffff"
                    borderColor="#03DAC5"
                    ariaLabel="progress-bar-loading" // Etiqueta accesible
                    wrapperStyle={{
                        animationDuration: ".1s", // Controla la velocidad de la animación
                    }}
                    wrapperClass="custom-progress-bar" // Clase CSS personalizada
                />
            }
            {type_loading === 'three_circles' &&
                <ThreeCircles
                    visible={true}
                    height="80"
                    width="80"
                    middleCircleColor="#03DAC5"
                    outerCircleColor="#fff"
                    innerCircleColor="#BB86FC"
                    ariaLabel="three-circles-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                />
            }
        </>
    );
}