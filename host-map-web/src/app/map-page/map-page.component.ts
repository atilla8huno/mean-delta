import {Component, OnInit} from '@angular/core';
import {Localizacao} from "../model/localizacao.model";
import {HttpClientService} from "../http-client.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'fd-map-page',
  templateUrl: './map-page.component.html',
  styleUrls: ['./map-page.component.css']
})
export class MapPageComponent implements OnInit {

    localizacao: any = new Localizacao();
    dominio: String;

    constructor(private httpClient: HttpClientService,
                private _activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        this._activatedRoute.params.subscribe((params) => {
            this.dominio = params['dominio'];
        });
    }

    exibirLocalizacao(localizacao: Localizacao): void {
        this.localizacao = localizacao;

        this.httpClient
            .post('http://localhost:3000/api/localizacao', localizacao)
            .subscribe((localizacao) => {
                console.log(localizacao);
            });
    }

}
