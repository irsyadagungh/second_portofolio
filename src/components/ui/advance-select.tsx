import React, { useEffect, useState } from "react";

interface Country {
    code: string;
    dial_code: string;
    name: string;
}

interface CountrySelectProps {
    listCountry: Country[];
}

export default function AdvanceSelect() {



    const country = [
        { "name": "Afghanistan", "code": "AF", "dial_code": "+93" },
        { "name": "Albania", "code": "AL", "dial_code": "+355" },
        { "name": "Algeria", "code": "DZ", "dial_code": "+213" },
        { "name": "Andorra", "code": "AD", "dial_code": "+376" },
        { "name": "Angola", "code": "AO", "dial_code": "+244" },
        { "name": "Argentina", "code": "AR", "dial_code": "+54" },
        { "name": "Armenia", "code": "AM", "dial_code": "+374" },
        { "name": "Australia", "code": "AU", "dial_code": "+61" },
        { "name": "Austria", "code": "AT", "dial_code": "+43" },
        { "name": "Azerbaijan", "code": "AZ", "dial_code": "+994" },
        { "name": "Bahamas", "code": "BS", "dial_code": "+1" },
        { "name": "Bahrain", "code": "BH", "dial_code": "+973" },
        { "name": "Bangladesh", "code": "BD", "dial_code": "+880" },
        { "name": "Belarus", "code": "BY", "dial_code": "+375" },
        { "name": "Belgium", "code": "BE", "dial_code": "+32" },
        { "name": "Belize", "code": "BZ", "dial_code": "+501" },
        { "name": "Benin", "code": "BJ", "dial_code": "+229" },
        { "name": "Bhutan", "code": "BT", "dial_code": "+975" },
        { "name": "Bolivia", "code": "BO", "dial_code": "+591" },
        { "name": "Bosnia and Herzegovina", "code": "BA", "dial_code": "+387" },
        { "name": "Botswana", "code": "BW", "dial_code": "+267" },
        { "name": "Brazil", "code": "BR", "dial_code": "+55" },
        { "name": "Brunei", "code": "BN", "dial_code": "+673" },
        { "name": "Bulgaria", "code": "BG", "dial_code": "+359" },
        { "name": "Burkina Faso", "code": "BF", "dial_code": "+226" },
        { "name": "Burundi", "code": "BI", "dial_code": "+257" },
        { "name": "Cambodia", "code": "KH", "dial_code": "+855" },
        { "name": "Cameroon", "code": "CM", "dial_code": "+237" },
        { "name": "Canada", "code": "CA", "dial_code": "+1" },
        { "name": "Chad", "code": "TD", "dial_code": "+235" },
        { "name": "Chile", "code": "CL", "dial_code": "+56" },
        { "name": "China", "code": "CN", "dial_code": "+86" },
        { "name": "Colombia", "code": "CO", "dial_code": "+57" },
        { "name": "Comoros", "code": "KM", "dial_code": "+269" },
        { "name": "Congo", "code": "CG", "dial_code": "+242" },
        { "name": "Costa Rica", "code": "CR", "dial_code": "+506" },
        { "name": "Croatia", "code": "HR", "dial_code": "+385" },
        { "name": "Cuba", "code": "CU", "dial_code": "+53" },
        { "name": "Cyprus", "code": "CY", "dial_code": "+357" },
        { "name": "Czech Republic", "code": "CZ", "dial_code": "+420" },
        { "name": "Denmark", "code": "DK", "dial_code": "+45" },
        { "name": "Djibouti", "code": "DJ", "dial_code": "+253" },
        { "name": "Dominican Republic", "code": "DO", "dial_code": "+1" },
        { "name": "Ecuador", "code": "EC", "dial_code": "+593" },
        { "name": "Egypt", "code": "EG", "dial_code": "+20" },
        { "name": "El Salvador", "code": "SV", "dial_code": "+503" },
        { "name": "Estonia", "code": "EE", "dial_code": "+372" },
        { "name": "Eswatini", "code": "SZ", "dial_code": "+268" },
        { "name": "Ethiopia", "code": "ET", "dial_code": "+251" },
        { "name": "Fiji", "code": "FJ", "dial_code": "+679" },
        { "name": "Finland", "code": "FI", "dial_code": "+358" },
        { "name": "France", "code": "FR", "dial_code": "+33" },
        { "name": "Gabon", "code": "GA", "dial_code": "+241" },
        { "name": "Gambia", "code": "GM", "dial_code": "+220" },
        { "name": "Georgia", "code": "GE", "dial_code": "+995" },
        { "name": "Germany", "code": "DE", "dial_code": "+49" },
        { "name": "Ghana", "code": "GH", "dial_code": "+233" },
        { "name": "Greece", "code": "GR", "dial_code": "+30" },
        { "name": "Guatemala", "code": "GT", "dial_code": "+502" },
        { "name": "Guinea", "code": "GN", "dial_code": "+224" },
        { "name": "Guyana", "code": "GY", "dial_code": "+592" },
        { "name": "Haiti", "code": "HT", "dial_code": "+509" },
        { "name": "Honduras", "code": "HN", "dial_code": "+504" },
        { "name": "Hungary", "code": "HU", "dial_code": "+36" },
        { "name": "Iceland", "code": "IS", "dial_code": "+354" },
        { "name": "India", "code": "IN", "dial_code": "+91" },
        { "name": "Indonesia", "code": "ID", "dial_code": "+62" },
        { "name": "Iran", "code": "IR", "dial_code": "+98" },
        { "name": "Iraq", "code": "IQ", "dial_code": "+964" },
        { "name": "Ireland", "code": "IE", "dial_code": "+353" },
        { "name": "Israel", "code": "IL", "dial_code": "+972" },
        { "name": "Italy", "code": "IT", "dial_code": "+39" },
        { "name": "Jamaica", "code": "JM", "dial_code": "+1" },
        { "name": "Japan", "code": "JP", "dial_code": "+81" },
        { "name": "Jordan", "code": "JO", "dial_code": "+962" },
        { "name": "Malaysia", "code": "MY", "dial_code": "+60" },
        { "name": "Singapore", "code": "SG", "dial_code": "+65" },
        { "name": "South Korea", "code": "KR", "dial_code": "+82" },
        { "name": "North Korea", "code": "KP", "dial_code": "+850" },
        { "name": "Mexico", "code": "MX", "dial_code": "+52" },
        { "name": "New Zealand", "code": "NZ", "dial_code": "+64" },
        { "name": "Pakistan", "code": "PK", "dial_code": "+92" },
        { "name": "Philippines", "code": "PH", "dial_code": "+63" },
        { "name": "Russia", "code": "RU", "dial_code": "+7" },
        { "name": "South Africa", "code": "ZA", "dial_code": "+27" },
        { "name": "Thailand", "code": "TH", "dial_code": "+66" },
        { "name": "Turkey", "code": "TR", "dial_code": "+90" },
        { "name": "Ukraine", "code": "UA", "dial_code": "+380" },
        { "name": "United Arab Emirates", "code": "AE", "dial_code": "+971" },
        { "name": "United Kingdom", "code": "GB", "dial_code": "+44" },
        { "name": "United States", "code": "US", "dial_code": "+1" },
        { "name": "Vietnam", "code": "VN", "dial_code": "+84" }
    ]

    const [selected, setSelected] = useState("");
    const CountrySelect = ({ listCountry }: CountrySelectProps) => {

        useEffect(() => {
            // Set the default country with dial code "+1" when the component mounts
            const defaultCountry = listCountry.find(country => country.code === "US");
            if (defaultCountry) {
                setSelected(defaultCountry.code.toLowerCase()); // Set the default country's code
            }
        }, [listCountry]);



        return (
            <div>
                <select
                    data-hs-select='{
                "hasSearch": true,
                "searchPlaceholder": "Search...",
                "searchClasses": "block text-black w-full sm:text-sm border-gray-200 rounded-lg before:absolute before:inset-0 before:z-1 py-1.5 sm:py-2 px-3",
                "searchWrapperClasses": "bg-white p-2 -mx-1 sticky top-0 dark:bg-neutral-900",
                "placeholder": "Select country...",
                "toggleTag": "<button class=\"border-0 \" type=\"button\" aria-expanded=\"false\"><span class=\"me-2\" data-icon></span><span class=\"text-white dark:text-neutral-200 \" data-title></span></button>",
                "toggleClasses": "w-32 hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-3 ps-4 pe-9 flex text-nowrap w-full cursor-pointer rounded-lg text-start text-sm dark:bg-neutral-900",
                "dropdownClasses": "mt-2 max-h-72 pb-1 px-1 space-y-0.5 z-20 w-full bg-white border border-gray-200 rounded-lg overflow-hidden overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 dark:bg-neutral-900 dark:border-neutral-700",
                "optionClasses": "py-2 px-4 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-lg",
                "optionTemplate": "<div><div class=\"flex items-center\"><div class=\"me-2\" data-icon></div><div class=\"text-gray-800 dark:text-neutral-200 \" data-title></div></div></div>",
                "extraMarkup": "<div class=\"absolute top-1/2 end-3 -translate-y-1/2\"><svg class=\"shrink-0 size-3.5 text-gray-500 dark:text-neutral-500 \" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"m7 15 5 5 5-5\"/><path d=\"m7 9 5-5 5 5\"/></svg></div>"
            }'
                    className="hidden"
                    defaultValue={selected}
                >
                    <option value="">Choose</option>
                    {country.map((country, index) => {
                        // Set default country to the one with dial code "+1"
                        const isDefault = country.dial_code === '+1';
                        // setSelected(isDefault ? country.code : selected);
                        return (
                            <option
                                key={index}
                                value={country.code.toLowerCase()}
                                data-hs-select-option={`{
                            "icon": "<img class=\\"inline-block size-4 rounded-full\\" src=\\"https://flagcdn.com/${country.code.toLowerCase()}.svg\\" alt=\\"${country.name}\\" />"
                        }`}
                                defaultValue={isDefault ? 'selected' : ''}
                            >
                                {country.dial_code}
                            </option>
                        );
                    })}
                </select>
            </div>
        );
    }
    return <CountrySelect listCountry={country} />;

}