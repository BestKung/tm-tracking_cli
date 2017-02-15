/**
 * Created by neng on 6/11/2559.
 */
export class ContractView {
    id: number;
    contractViewPk: ContractViewPk = new ContractViewPk();
    cardNo: string;
    tumbon: string;
    aumbhur: string;
    province: string;
    postCode: string;
    email: string;
    trNoSeq: string;
}

export class ContractViewPk {
    contractName: string;
    address: string;
}