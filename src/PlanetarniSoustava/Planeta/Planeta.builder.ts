import * as BABYLON from '@babylonjs/core'
import { DataPlanet } from "../DataPlanet";
import { ObjeznaDraha } from './ObjeznaDraha/ObjeznaDraha';
import { IPlaneta } from "./Planeta.interface";

export class Planeta{
    public createPlanetu(planeta: string, scene: BABYLON.Scene): BABYLON.Mesh{
        const dataPlanety: IPlaneta = DataPlanet.orbitalniPrvky[planeta];

        const modelPlanety: BABYLON.Mesh = BABYLON.MeshBuilder.CreateSphere(dataPlanety.nazev, { diameter: dataPlanety.polomer * 2}, scene);

        const material: BABYLON.StandardMaterial = new BABYLON.StandardMaterial(modelPlanety.name + "Material", scene);
        material.specularPower = 0;    
        modelPlanety.material = material;

        const diffuseTexture = new BABYLON.Texture(dataPlanety.texturaUrl , scene);
        diffuseTexture.vScale = -1;
        diffuseTexture.uScale = -1;
        material.diffuseTexture = diffuseTexture;

        if (dataPlanety.normalTextureUrl) {
            const normalMapTexture = new BABYLON.Texture(dataPlanety.normalTextureUrl , scene);
            normalMapTexture.vScale = -1
            normalMapTexture.uScale = -1
            material.bumpTexture = normalMapTexture;
        } 

        if (dataPlanety.nightMapTextureUrl) {
            const nightMapTexture = new BABYLON.Texture(dataPlanety.nightMapTextureUrl , scene);
            nightMapTexture.vScale = -1
            nightMapTexture.uScale = -1
            material.emissiveTexture = nightMapTexture;
        } 
        material.backFaceCulling = false;

        modelPlanety.position = ObjeznaDraha.vypocetPozicePlanety(dataPlanety.elementyDrahy, 100);
    
        return modelPlanety;
    }

    public createObjeznouDrahu(planeta: string, scene: BABYLON.Scene): BABYLON.LinesMesh{
        const dataPlanety: IPlaneta = DataPlanet.orbitalniPrvky[planeta];
        const numPoints = 100;
        const points: BABYLON.Vector3[] = ObjeznaDraha.vypocetObjezneDrahy(dataPlanety.elementyDrahy, 100);
        const barva: BABYLON.Color4[] = [];
        for (let index = 0; index <= numPoints; index++) {
            barva.push(dataPlanety.barva.toColor4(1))
        }        
        const orbit: BABYLON.LinesMesh = BABYLON.MeshBuilder.CreateLines(dataPlanety.nazev + "Orbit", {
                points: points, colors: barva
            }, scene);
        
        return orbit;
    }

    public static scaleOnZoom(slunce: BABYLON.Mesh, planety: BABYLON.Mesh[], objezneDrahy: number) {}

}