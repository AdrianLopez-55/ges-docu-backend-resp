import { HttpService } from '@nestjs/axios';
import { Body, Controller, Post } from '@nestjs/common';
import axios from 'axios';
import { Base64DocumentDto, UploadDocumentDto } from './dto/base64-document.dto';
import { log } from 'console';

@Controller('base64-document')
export class Base64DocumentController {
	constructor(private readonly httpService: HttpService){}
	private readonly apiFilesUploader = process.env.API_FILES_UPLOADER;
	@Post()
	async uploaderFiles(@Body() uploadDocumentDto: UploadDocumentDto){
		try {
			const { base64 } = uploadDocumentDto.file;
		const response = await axios.post(`${this.apiFilesUploader}/files/upload`, {
			base64, 
		});
		const {_id, filename, category} = response.data;
		return {
			_id,
			filename,
			category,
		};
	} catch (error){
		console.log(error)
		throw new Error('Error al procesar doucmento')
	}
	}
}

