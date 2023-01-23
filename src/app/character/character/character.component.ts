import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CharacterService} from "../services/character.service";
import {CharacterModel} from "../model/character.model";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {EpisodeModel} from "../model/episode.model";

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent implements OnInit{

  // @ts-ignore
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  // @ts-ignore
  @ViewChild(MatPaginator, {static: true}) paginatorDataSource: MatPaginator;

  public form!: FormGroup;
  public loading: boolean = false;
  public pageNumber!: number;
  public totalElements!: number;
  public totalPages!: number;
  public pageEvent: PageEvent = new PageEvent;
  private _items: CharacterModel[] = [];

  displayedColumns: string[] = ['id', 'name', 'episode', 'airDate', 'url', 'created'];
  dataSource = new MatTableDataSource<EpisodeModel>();

  constructor(
    private _fb: FormBuilder,
    private _characterService: CharacterService,
    private _snackBar: MatSnackBar,
  ) {
    this.criarFormulario();
  }

  ngOnInit(): void {
    this.loadingCharacter(null, null);
  }

  get items(): CharacterModel[] {
    return this._items;
  }

  set items(value: CharacterModel[]) {
    this._items = value;
  }

  public sendForm(): void {
    this.loadingCharacter(this.form.value.nomePersonagem);
  }

  public loadingCharacter(name?: any, page?: any): void {
      this.loading = true;
      this._characterService.list(name, page).subscribe({
        next: (value) => {
          this.items = value.content
          this.pageNumber = value.pageable.pageNumber;
          this.totalPages = value.pageable.totalPages;
          this.totalElements = value.pageable.totalElements;
          this.dataSource.paginator = this.paginatorDataSource;
          this.loading = false;
        },
        error: (err) => {
          this.loading = false;
          this._snackBar.open('Erro ao realizar requisição!','Fechar',{
            duration: 3000
          });
        }
      });
  }

  private criarFormulario(): FormGroup {
    const formItens = {
      nomePersonagem: [null]
    };

    return this.form = this._fb.group(formItens);
  }

  public limparPesquisa(): void {
    this.criarFormulario().reset();
  }

  getData(event: PageEvent): void {
    this.loadingCharacter(null, event.pageIndex);
  }
}
