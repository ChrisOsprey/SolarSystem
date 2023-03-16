import { SlunecniSoustava } from "../SlunecniSoustava";
import { KartaInfoPlanety } from "./KartaInfoPlanety";

export class InfoKartaPlanety {
    private app: SlunecniSoustava;
    private flexContent: HTMLElement | null;
    private canvas: HTMLCanvasElement | null;
    private infoKarta : HTMLElement | null;
    private button : HTMLElement | null ;    
    private infoKartaOpenState: boolean;
    private icon: HTMLElement | null;
    private mode: boolean = false;

    public constructor (app: SlunecniSoustava) {  
        this.app = app;

        this.flexContent = document.getElementById("kontent");
        this.canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;
        this.infoKarta = document.getElementById('infoKarta');
        this.button = document.getElementById('toggleInfoKartu');
        this.icon = document.getElementById("icon");
        this.infoKartaOpenState = false;
        this.mode = this.isVerticalMode();
        this.setIcon();
        if(this.isVerticalMode())this.resizeContent();
        window.addEventListener('resize', () => {
            app.engine.resize();
            if(this.isVerticalMode() !== this.mode){
                this.resizeContent();
                this.setIcon();
                this.mode = this.isVerticalMode();
            }
        });
        this.button?.addEventListener('click', () => {
            !this.infoKartaOpenState ? this.open() : this.close();           
        })

        new KartaInfoPlanety(app);
    }

    private resizeContent(){
            this.flexContent?.classList.toggle("vertical");
            this.canvas?.classList.toggle("vertical");
            this.infoKarta?.classList.toggle("vertical");
    }

    private setIcon(){
        if (!this.isVerticalMode() && this.icon){
            this.icon.innerHTML =  !this.infoKartaOpenState 
                ? '<path fill="#fff" fill-rule="evenodd" d="M7.22165154,9.89744874 C9.52208535,7.58981934 11.7700755,5.33826192 13.9656219,3.14277649 C14.1209717,2.97988892 14.2765198,2.59362793 13.9656219,2.24739075 C13.6547241,1.90115356 13.1625366,1.93119812 12.9394989,2.16644287 C10.6628164,4.4490153 8.2816569,6.83439128 5.79602051,9.3225708 C5.5986735,9.48506673 5.5,9.67669271 5.5,9.89744874 C5.5,10.1182048 5.5986735,10.315327 5.79602051,10.4888153 C8.60631704,13.2334646 11.1006865,15.6689637 13.2791289,17.7953128 C13.4962463,18 13.9656219,18.1251984 14.3231659,17.7660828 C14.6807098,17.4069672 14.5432434,17.0530853 14.3809204,16.8845825 C12.3062744,14.866628 9.91985146,12.5375834 7.22165154,9.89744874 Z"/>'
                : '<path fill="#fff" fill-rule="evenodd" d="M7.05307007,2.15808105 L14.2962587,9.41418482 C14.4320862,9.5496827 14.5,9.71077067 14.5,9.89744874 C14.5,10.0841268 14.4320862,10.2497803 14.2962587,10.3944092 C11.6760845,12.9498393 9.15095523,15.4168071 6.72087106,17.7953128 C6.5962677,17.912323 6.09560574,18.2032928 5.70989407,17.7705688 C5.3241824,17.3378448 5.55848694,16.9602509 5.70989407,16.8045692 C7.97174895,14.594209 10.3279004,12.2918355 12.7783485,9.89744874 L6.03100586,3.13816833 C5.78524099,2.79925826 5.80526899,2.48632792 6.09108986,2.19937732 C6.37691073,1.91242672 6.6975708,1.8986613 7.05307007,2.15808105 Z"/>';
        }
        if (this.isVerticalMode() && this.icon) {
            this.icon.innerHTML =  !this.infoKartaOpenState 
                ? '<path fill="#fff" fill-rule="evenodd" d="M10.1025513,7.22165154 C13.549533,10.6902823 15.8466074,12.9862104 16.9937744,14.109436 C17.1906416,14.2940129 17.5317688,14.6698914 18.0392151,14.1790161 C18.3775126,13.851766 18.3644409,13.4939982 18,13.1057129 L10.556488,5.67610168 C10.432251,5.55870056 10.2805653,5.5 10.1014311,5.5 C9.92229687,5.5 9.76473264,5.55870056 9.6287384,5.67610168 L2.17555237,13.3108978 C1.93475791,13.6991321 1.94470649,14.025777 2.20539811,14.2908324 C2.46608974,14.5558878 2.78324382,14.5701396 3.15686035,14.3335876 L10.1025513,7.22165154 Z"/>'
                : '<path fill="#fff" d="M10.1025513,12.7783485 L16.8106554,6.0794438 C17.0871744,5.80330401 17.5303978,5.80851813 17.8006227,6.09108986 C18.0708475,6.37366159 18.0657451,6.82658676 17.7892261,7.10272655 L10.5858152,14.2962587 C10.3114043,14.5702933 9.87226896,14.5675493 9.60115804,14.2901058 L2.2046872,6.72087106 C1.93149355,6.44129625 1.93181183,5.98834118 2.20539811,5.7091676 C2.47898439,5.42999401 2.92223711,5.43031926 3.19543076,5.70989407 L10.1025513,12.7783485 Z"/>';
        }
    }

    public isVerticalMode (): boolean {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        return (windowWidth < windowHeight || windowWidth < 768) ? true : false;
    }

    public open(){
        this.infoKartaOpenState = !this.infoKartaOpenState;
        if (this.canvas){
            this.canvas.classList.toggle("openInfoKartu");
        }
        this.setIcon();

    }

    public close(){
        console.log('close')
        this.infoKartaOpenState = !this.infoKartaOpenState;
        if (this.canvas){
            this.canvas.classList.toggle("openInfoKartu");
        }
        this.setIcon();
    }
}
   