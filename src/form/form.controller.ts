import { Controller, Post, Get, Put, Delete, Body,Param,ParseIntPipe } from '@nestjs/common';
import { FormService } from './form.service';
import { IForm } from './form.interface';

@Controller('/form')
export class FormController {
    constructor(private readonly formService: FormService) {}

    @Post()
    async create(@Body() createFormDto: any) {
        return this.formService.create(createFormDto);
    }
}

