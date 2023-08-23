export const ValidateUtil = {
    /**
     * 如格式符合: YYYY/(M)M/(D)D YYYY(M)M(D)D\
     * 會回傳物件:{ year: string, month: string, date: string }
     */
    getDateObject: (value: string): { year: string, month: string, date: string } | null =>
    {
        const regExp = /^(\d{4})\/?(\d{1,2})\/?(\d{1,2})$/;
        if (regExp.test(value))
        {
            const list = value.replace(regExp, '$1/$2/$3').split('/');
            return { year: list[0], month: list[1], date: list[2] };
        }
        return null;
    },
    /** 日期是否合法 */
    isValidDate: (value: string): boolean =>
    {
        const result = ValidateUtil.getDateObject(value);
        if (result)
        {
            const date = new Date(+result.year, +result.month - 1, +result.date);
            // 驗證日期合法，且年月日相同
            if (!/invalid/i.test(date.toString()) &&
                date.getFullYear() === +result.year &&
                (date.getMonth() + 1) === +result.month &&
                date.getDate() === +result.date)
            {
                return true;
            }
        }
        return false;
    },
    /** 統一編號(Unified Business No.)檢查 */
    checkUBN: (value: string): boolean =>
    {
        let result = false;
        if (/^\d{8}$/.test(value))
        {
            // 「檢查邏輯由可被『10』整除改為可被『5』整除」
            const checkNum = 5;
            // 所有位數遞歸加總至個位數
            const getResultNumber = (n: number): number =>
            {
                const res = [...(n + '')].reduce((p, c) => +p + +c, 0);
                return res > 9 ? getResultNumber(res) : res;
            };
            // 倒數第二位為 7?
            const isSpecial = /^\d{6}7\d$/.test(value);
            // 用來相乘的陣列
            const checkList = [1, 2, 1, 2, 1, 2, 4, 1];
            // 加總結果
            const total = [...value].map((e, i) => getResultNumber(+e * checkList[i]))
                .reduce((p, c) => p + c, 0);
            // (直接被整除) 或 (倒數第二位為 7 時減 1 可直接被整除)
            if (
                total % checkNum === 0 ||
                (isSpecial && (total - 1) % checkNum === 0)
            )
            {
                result = true;
            }
        }
        return result;
    },
    /** 身份證字號檢查(移植舊系統之驗證) */
    checkIdentity: (identity: string): boolean =>
    {
        let result = false;
        if (identity && /^[A-Z]{1}[12]{1}\d{8}$/.test(identity))
        {
            const firstStr = identity.charAt(0);
            const firstList = {
                A: 10, B: 11, C: 12, D: 13, E: 14, F: 15, G: 16, H: 17, I: 34, J: 18,
                K: 19, L: 20, M: 21, N: 22, O: 35, P: 23, Q: 24, R: 25, S: 26, T: 27,
                U: 28, V: 29, W: 32, X: 30, Y: 31, Z: 33
            };
            const firstnum = firstList[firstStr];
            let num = Math.floor(firstnum / 10) + firstnum % 10 * 9;
            const stringList = identity.substring(1, identity.length).split('');
            let i = 8;
            stringList.forEach((tmpStr) =>
            {
                num += parseInt(tmpStr, 10) * i;
                i--;
            });
            const checkNum = parseInt(identity.charAt(9), 10);
            const checkCode = 10 - (num % 10);
            if (checkNum === checkCode % 10)
            {
                result = true;
            }
        }
        return result;
    },
    /**
     * email檢查
     * Email 主要由三部分組成： 「郵件帳號」+「@」+「郵件網域」\
     * 郵件帳號可由以下字元組成：a-z、A-Z、0-9、底線 (_) 和單點 (.)\
     * 郵件網域只可由下列字元組成：a-z、A-Z、0-9、減號(-) 和單點 (.)
     */
    checkEmail: (str: string): boolean =>
    {
        let result = false;
        const res = /^[a-z0-9_.]+@[a-z0-9-.]+$/i;
        if (str && res.test(str))
        {
            result = true;
        }
        return result;
    },
    /***
     * 取得成年自然人定義年齡
	 * 20230101前：20歲
	 * 20230101後：改為18歲
     */
    getMajorityAge: () =>
    {
        // new date要減一個月(0是1月)
        return ValidateUtil.isTodayBeforDate(new Date(2022, 12, 1)) ? 20 : 18;
    },
    /***
     * 判斷日期今天是否小於date
     */
    isTodayBeforDate: (date): boolean =>
    {
        return new Date().getTime() <= date.getTime();
    },
    /**
     * 外來人口統一證號(新和舊)
    */
    isMigrantsId: (identity: string): boolean =>
    {
        let result = false;
        if (identity && /^([A-Z])(A|B|C|D|8|9)(\d{8})$/.test(identity))
        {
            const firstStr = identity.charAt(0);
            const charList = {
                A: 10, B: 11, C: 12, D: 13, E: 14, F: 15, G: 16, H: 17, I: 34, J: 18,
                K: 19, L: 20, M: 21, N: 22, O: 35, P: 23, Q: 24, R: 25, S: 26, T: 27,
                U: 28, V: 29, W: 32, X: 30, Y: 31, Z: 33
            };
            const firstnum = charList[firstStr];
            const secondStr = identity.charAt(1);
            let num = Math.floor(firstnum / 10) + firstnum % 10 * 9;
            let stringList: string[] = [];
            let i: number = 0;
            if(/^[8|9]$/.test(secondStr)){
                stringList = identity.substring(1, identity.length).split('');
                i = 8;
            } else if(/^[A|B|C|D]$/.test(secondStr)){
                const secondnum = charList[secondStr];
                const num2 = Math.floor(secondnum / 10) + secondnum % 10 * 8;
                stringList = identity.substring(3, identity.length).split('');
                i = 7;
                num += num2;
            }
            stringList.forEach((tmpStr) => {
                num += parseInt(tmpStr, 10) * i;
                i--;
            });
            const checkNum = parseInt(identity.charAt(9), 10);
            const checkCode = 10 - (num % 10);
            if (checkNum === checkCode % 10)
            {
                result = true;
            }
        }
        return result;
    }
};
