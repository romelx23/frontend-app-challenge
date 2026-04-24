import { useState } from "react";
import { fetchAccounts } from "../../../api/kambista/accounts";
import { fetchBanks } from "../../../api/kambista/banks";
import { fetchSourceFunds } from "../../../api/kambista/sourceFunds";
import { useBanks } from "../store/banks";

export const useAccounts = () => {

    const [loading, setLoading] = useState(true);
    const [bankList, setBankList] = useState<{ label: string; value: string, alias: string }[]>([]);
    const [sourceFunds, setSourceFunds] = useState<{ label: string; value: string }[]>([]);
    const [accountList, setAccountList] = useState<{
        value: string;
        name: string;
        alias: string;
        type: string;
        number: string;
        typeMoney: string
    }[]>([])


    const { setBanks } = useBanks();

    const getAccounts = () => {
        fetchAccounts().then((data) => {
            const formatData = data.map(a => (
                {
                    value: a.id,
                    name: a.name,
                    alias: a.alias,
                    type: a.type,
                    number: a.number,
                    typeMoney: a.typeMoney
                }
            ))
            setAccountList(formatData)
            setLoading(false);
        });
    }

    const getBanks = () => {
        fetchBanks().then((data) => {
            const formatData = data.map(b => (
                {
                    label: b.name,
                    value: b.id,
                    alias: b.alias
                }
            ))
            setBankList(formatData);
            setBanks(data);
            setLoading(false);
        });
    }

    const getSourceFunds = () => {
        fetchSourceFunds().then((data) => {
            const formatData = data.map(s => (
                {
                    label: s.name,
                    value: s._id
                }
            ))
            setSourceFunds(formatData);
            setLoading(false);
        });
    }

    return {
        getAccounts,
        accountList,
        loading,
        getBanks,
        getSourceFunds,
        bankList,
        sourceFunds
    }
}