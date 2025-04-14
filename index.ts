import {z} from "zod";

export const zOvenFanLevel = z.enum(['off', 'low', 'high'])
export type OvenFanLevel = z.infer<typeof zOvenFanLevel>

export const zDegreesUnit = z.enum(['f', 'c']);
export type DegreesUnit = z.infer<typeof zDegreesUnit>

export const zAmount = z.object({
  amount: z.number(),
  unit: z.string()
})
export type Amount = z.infer<typeof zAmount>
export const zNote = z.string()
export type Note = z.infer<typeof zNote>

export const zIngredientBase = z.object({
  name: z.string(),
  amounts: z.array(zAmount),
  processing: z.array(z.string()).optional(),
  notes: z.array(zNote).optional(),
  usda_num: z.number().int(),
})
export type IngredientBase = z.infer<typeof zIngredientBase>

export const zIngredient = zIngredientBase.extend({
  substitutions: z.array(zIngredientBase)
})
export type Ingredient = z.infer<typeof zIngredient>

export const zSourceBook = z.object({
  authors: z.array(z.string()),
  title: z.string(),
  isbn: z.string().regex(/^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/),
  notes: z.array(z.string())
})
export type SourceBook = z.infer<typeof zSourceBook>

export const zControlPoint = z.object({
  control_point: z.string()
})
export type ControlPoint = z.infer<typeof zControlPoint>

export const zCriticalControlPoint = z.object({
  critical_control_point: z.string()
})
export type CriticalControlPoint = z.infer<typeof zCriticalControlPoint>

export const zStep = z.object({
  step: z.string(),
  haccp: zControlPoint.or(zCriticalControlPoint).optional()
})
export type Step = z.infer<typeof zStep>

export const zRecipe = z.object({
  oven_fan: zOvenFanLevel,
  oven_temp: z.object({
    amount: z.number(),
    unit: zDegreesUnit
  }),
  oven_time: z.string(),
  ingredients: z.array(zIngredient),
  notes: z.array(zNote).optional(),
  recipe_name: z.string(),
  recipe_uuid: z.string(),
  source_book: zSourceBook.optional(),
  source_authors: z.array(z.string()),
  source_url: z.string().optional(),
  steps: z.array(zStep),
  yields: z.array(zAmount)
})
export type Recipe = z.infer<typeof zRecipe>