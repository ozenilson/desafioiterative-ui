import {EpisodeModel} from "./episode.model";

export interface CharacterModel {
  id: number;
  name: string;
  status: string;
  url: string;
  created: string;
  Episodes: EpisodeModel[];
}
