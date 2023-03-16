import { IInfoPlanety } from "../PlanetarniSoustava/InfoPlanety.interface";
import { SlunecniSoustava } from "../SlunecniSoustava";
import { DataPlanet } from "../PlanetarniSoustava/DataPlanet";

export class KartaInfoPlanety {
    private app: SlunecniSoustava;
    private title: HTMLElement | null;
    private paragraf: HTMLElement | null;
    private dataPlanet: DataPlanet = new DataPlanet();
    private dotNav: HTMLElement | null;

    public constructor(app: SlunecniSoustava){
        this.app = app;
        this.title = document.getElementById("title");
        this.paragraf = document.getElementById("paragraf");
        this.dotNav =  document.getElementById("dotnav");

        this.initInfoPlanety();
    }

    private getDefaultInfo(): string {
        return "Slunce je velmi zajímavým objektem nejen v naší sluneční soustavě, ale i v celé galaxii. Je to obrovská koule plazmy, která produkuje ohromné množství energie. V centru Slunce probíhá termonukleární reakce, která způsobuje uvolňování energie v podobě tepla, světla a záření. Tato energie je distribuována po celé sluneční soustavě a umožňuje život na Zemi. Navzdory tomu, že Slunce vypadá jako nehybný bod na obloze, ve skutečnosti se neustále pohybuje a obíhá kolem galaktického centra spolu s celou sluneční soustavou."
    }


    
    private initInfoPlanety(){
        debugger
        if(this.title) this.title.textContent = this.app.meshIdInView.name;
        if(this.paragraf) this.paragraf.textContent = (this.app.meshIdInView.name !== "Slunce") ? this.dataPlanet.orbitalniPrvky[this.app.meshIdInView.name].infoPlanety?.text : this.getDefaultInfo();

        if(this.dotNav){
            const dots = Array.from(this.dotNav.children);
            for (const dot of dots){
                dot.addEventListener("click", () => {
                    this.app.setMeshInView(dot.id);
                })
            }
        }
        

    }
}