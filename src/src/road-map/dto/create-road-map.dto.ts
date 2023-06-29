import { ApiProperty } from "@nestjs/swagger"
import { IsArray, IsString } from "class-validator"

export class CreateRoadMapDto {
	@ApiProperty({example: 'hoja de ruta para gastos'})
	@IsString()
	readonly nameRoadMap: string;

	@ApiProperty({example: 'DOC-001'})
	@IsString()
	readonly document: string

	@ApiProperty({example: 'Llevar datos de gastos'})
	@IsString()
	readonly documentPurpose: string;

	@ApiProperty({example: 'el alcance es solo mostrar los datos de gastos'})
	@IsString()
	readonly documentScope: string;

	@ApiProperty({example: ['departamento 5E', 'departamento 6F', 'Gestor jefe gastos']})
	@IsArray()
	readonly map: string[];

	@ApiProperty({example: ['transporte', 'papelera']})
	@IsArray()
	readonly resources: string[];

	@ApiProperty({example: 'Se muestran datos sobre gastos en compra de ...'})
	@IsString()
	readonly description: string;

	@ApiProperty({example: '2023-05-29T03:05:14.742Z'})
	@IsString()
	readonly dateInit: string;

	@ApiProperty({example: '2023-05-29T03:05:14.742Z'})
	@IsString()
	readonly dateEnd: string;
}
