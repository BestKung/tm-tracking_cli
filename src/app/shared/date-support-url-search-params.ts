import {URLSearchParams} from "@angular/http";
/**
 * Created by pramoth on 10/27/2016 AD.
 */
export class DateSupportURLSearchParams extends URLSearchParams{

    set(param: string, val: string|Date| number) {
        if (val === void 0 || val === null) {
            this.delete(param);
            return;
        }
        const list = this.paramsMap.get(param) || [];
        list.length = 0;
        if(val['toISOString']){
            list.push((val as Date).toISOString());
        }else if((typeof val) == 'number') {
            list.push(val + '');
        }else{
            list.push(val as string);
        }
        this.paramsMap.set(param, list);
    }

}