import { CashRegisterGroupInterface } from "../entities/CashRegisterGroup";

class CashRegisterGroupRepository {
    async save(data: CashRegisterGroupInterface) {
        // const repository = getRepository<CashRegisterGroupInterface>(CashRegisterGroupModel);

        // const savedCashRegisterGroup = await repository.save(data);

        return 'savedCashRegisterGroup';
    }

    async list(page: number, limit: number, OngId: number) {
        // const repository = getRepository<CashRegisterGroupInterface[]>(CashRegisterGroupModel);

        // const listCashRegisterGroups = await repository.find({
        //     where: { OngId },
        //     skip: page,
        //     take: limit
        // });

        return 'listCashRegisterGroups';
    }

    async show(id: number, OngId: number) {
        // const repository = getRepository<CashRegisterGroupInterface>(CashRegisterGroupModel);

        // const selectedCashRegisterGroup = await repository.findOne({
        //     where: { id, OngId }
        // });

        return 'selectedCashRegisterGroup' || {};
    }

    async update(id: number, data: CashRegisterGroupInterface) {
        // const repository = getRepository<CashRegisterGroupInterface>(CashRegisterGroupModel);

        // const updatedCashRegisterGroup = await repository.update(id, data);

        return 'updatedCashRegisterGroup';
    }

    async delete(id: number, OngId: number) {
        // const repository = getRepository<CashRegisterGroupInterface>(CashRegisterGroupModel);

        // const selectedCashRegisterGroup = await repository.findOne({
        //     where: {
        //         id, OngId, deletedAt: IsNull()
        //     }
        // });

        // const deletedCashRegisterGroup = await repository.softDelete(id);
        // if (selectedCashRegisterGroup) {
        //     await repository.save({
        //         ...selectedCashRegisterGroup, deletedAt: new Date()
        //     });
        // }

        return {};
    }
}

export {
    CashRegisterGroupRepository
}