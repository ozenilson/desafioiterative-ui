import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CharacterRoutingModule } from './character-routing.module';
import { CharacterComponent } from './character/character.component';
import { AngularMaterialModule } from '../angular-material.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CharacterComponent
  ],
  imports: [
    CommonModule,
    CharacterRoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule
  ]
})
export class CharacterModule { }
