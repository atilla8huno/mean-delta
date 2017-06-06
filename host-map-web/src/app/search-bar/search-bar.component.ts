import {Component, OnInit, EventEmitter, Output, Input} from '@angular/core';
import {HttpClientService} from "../http-client.service";
import {Localizacao} from "../model/localizacao.model";

@Component({
    selector: 'fd-search-bar',
    templateUrl: './search-bar.component.html',
    styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

    @Input()
    dominio: String;

    @Output()
    localizacao: EventEmitter<Localizacao> = new EventEmitter<Localizacao>();

    constructor(private httpClient: HttpClientService) {
    }

    ngOnInit() {
        if (this.dominio) {
            this.pesquisar();
        }
    }

    pesquisar(): void {
        this.httpClient
            .get('http://ip-api.com/json/' + this.dominio)
            .subscribe(
                (data) => {
                    data.dominio = this.dominio;

                    this.localizacao.emit(data);
                },
                (error) => console.error(error)
            );
    }

}
