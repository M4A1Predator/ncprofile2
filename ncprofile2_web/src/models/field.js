export const fieldSchema = {
  "id": "/FieldSchema",
  "type": "object",
  "properties": {
    "name": { "type": "string" },
    "type": { "type": "string", format: "fieldTypeFormat" }
  },
  "required": ['name', 'type', 'data']
}