import { Document, Schema, model } from 'mongoose';

type Color = 'blanco' | 'azul' | 'negro' | 'rojo' | 'verde' | 'incoloro' | 'multicolo';
type TimeLine = 'tierra' | 'criatura' | 'encantamiento' | 'conjuro' | 'instantaneo' | 'artefacto' | 'planeswalker';
type Rarity = 'comun' | 'infrecuente' | 'rara' | 'mitica';

interface CardDocumentInterface extends Document {
  name: string,
  manacost: number,
  color: Color,
  timeline: TimeLine,
  rarity: Rarity,
  rules: string,
  strength?: [number, number],
  loyalty?: number,
  value: number,
}

const CardSchema = new Schema<CardDocumentInterface>({
  name: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  manacost: {
    type: Number,
    required: true,

  },
  color: {
    type: String,
    trim: true,
    default: 'blanco',
    enum: [ 'blanco', 'azul', 'negro', 'rojo', 'verde', 'incoloro', 'multicolor'],
  },
  timeline: {
    type: String,
    trim: true,
    default: 'tierra',
    enum: [ 'tierra', 'criatura', 'encantamiento', 'conjuro', 'instantaneo', 'artefacto', 'planeswalker']
  },
  rarity: {
    type: String,
    trim: true,
    default: 'comun',
    enum: [ 'comun', 'infrecuente', 'rara', 'mitica']
  },
  rules: {
    type: String,
    trim: true,
    default: "No rules for this card"
  },
  strength: {
    type: Array,
    length: 2,
    default: undefined
  },
  loyalty: {
    type: Number,
    default: undefined
  },
  value: {
    type: Number,
    required: true
  }
});

export const Card = model<CardDocumentInterface>('Card', CardSchema);
