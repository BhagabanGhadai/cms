import { prop, getModelForClass } from '@typegoose/typegoose';

class Case {
    @prop({ required: true })
    public bankName!: string;

    @prop({ required: true })
    public propertyName!: string;

    @prop({ required: true })
    public city!: string;

    @prop({ required: true })
    public borrowerName!: string;

    @prop({ required: true, default: Date.now })
    public createdAt!: Date;
}

export const CaseModel = getModelForClass(Case);