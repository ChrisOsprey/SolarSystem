import { InfoKartaPlanety } from './GUI/PlanetMenu';
import { SlunecniSoustava as App } from './SlunecniSoustava';

window.addEventListener('DOMContentLoaded', () => {
    let canvas = document.getElementById('renderCanvas') as HTMLCanvasElement;
    let app = new App(canvas);
    let InfoKarta = new InfoKartaPlanety(app);
    app.run();


});






