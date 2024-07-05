import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import { districtItem } from "./chart";
import { District, Question, renderChartIndicator, ResponseGetdistricts, User } from "../../services/apis/types";
import { DropdownType } from "../atoms/dropdown";

type ThemeType = 'light' | 'dark';
interface ChartContextData {
    chartData: districtItem[] | undefined,
    chartDataRoot: districtItem[] | undefined,
    handleSetChartData: (data: districtItem[]) => void,
    handleSetChartDataRoot: (data: districtItem[]) => void,
    loading: boolean,
    handleSetLoading: (data: boolean) => void,
    handleSetIsFilter: (data: boolean) => void,
    isFilter: boolean,
    handleUpdateDistrictIndicators: (data: ResponseGetdistricts) => void,
    districtIndicators: ResponseGetdistricts | undefined,
    districts: DropdownType[] | undefined,
    indicators: DropdownType[] | undefined,
    handleShowDetail: (data: boolean) => void,
    isShowDetail: boolean,
    handleSetInfoDetail: (type: districtItem) => void,
    infoDetail: districtItem | undefined,
    questions?: DropdownType[] | undefined,
    isSignIn: boolean,
    handleUpdateSignIn: (data: boolean) => void,
    token: string | undefined;
    handleSetToken: (data: any) => void,
    districtActive: District | undefined;
    handleSetDistrictActive: (data: District) => void;
    sreenWidth: number;
    handleSetTheme: (newTheme: ThemeType) => void;
    theme: ThemeType;
    userInfo: User | undefined;
    handleSetInfoUser: (newTheme: User) => void;
    allIndicators: renderChartIndicator[] | undefined
    handleCheckSafari: (value: boolean) => void;
    isSafari: boolean;
}

interface ChartProviderProps {
    children?: React.ReactNode;
}

const ChartContext = createContext<ChartContextData>({} as ChartContextData);

const ChartProvider: React.FC<ChartProviderProps> = ({ children }) => {
    const [chartData, setChartData] = useState<districtItem[]>();
    const [chartDataRoot, setChartDataCloneRoot] = useState<districtItem[]>();
    const [loading, setLoading] = useState(false);
    const [isFilter, setIsFilter] = useState(false);
    const [districtIndicators, setDistrictIndicators] = useState<ResponseGetdistricts>();
    const [districts, setDistricts] = useState<DropdownType[]>();
    const [indicators, setIndicators] = useState<DropdownType[]>();
    const [isShowDetail, setIsShowDetail] = useState(false);
    const [infoDetail, setInfoDetail] = useState<districtItem>();
    const [questions, setQuestions] = useState<DropdownType[]>();
    const [isSignIn, setIsSignIn] = useState(false);
    const [token, setToken] = useState(undefined);
    const [districtActive, setDistrictActive] = useState<District>();
    const [sreenWidth, setSreenWidth] = useState(window.innerWidth);
    const [theme, setTheme] = useState<ThemeType>('light');
    const [userInfo, setUserInfo] = useState<User>();
    const [allIndicators, setAllIndicators] = useState<renderChartIndicator[]>();
    const [isSafari, setIsSafari] = useState(false);

    useEffect(() => {
        window.addEventListener("resize", () => {
            setSreenWidth(window.innerWidth);
        });
    }, [window.innerWidth])

    const handleCheckSafari = (brower: boolean) => setIsSafari(brower);
    const handleSetTheme = (newTheme: ThemeType) => setTheme(newTheme);
    const handleSetInfoUser = (newTheme: User) => setUserInfo(newTheme);

    const handleSetToken = (newToken: any) => setToken(newToken)
    const handleSetDistrictActive = (newActive: District) => setDistrictActive(newActive);

    const handleUpdateSignIn = (value: boolean) => setIsSignIn(value)

    const handleUpdateDistrictIndicators = (data: ResponseGetdistricts) => {
        setDistrictIndicators(data);
        const definedQuestions = ((data.districts ?? [])[0]?.questions || []).map((item) => ({
            id: item.id,
            group_id: item.indicator_id,
            group_name: item.indicator.name,
            label: item.title,
            value: item.question_code,
        }));
        setQuestions(definedQuestions);
    };

    const handleShowDetail = (type: boolean) => {
        setIsShowDetail(type);
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    };
    const handleSetInfoDetail = (type: districtItem) => {
        setInfoDetail(type);
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }

    const handleSetChartData = (data: districtItem[]) => {
        setChartData(data);
        const defineIndicators = data[0].indicators?.map((item) => ({
            id: item.indicator_id,
            label: item.indicator,
            value: item.indicator,
        }));
        const listDistrict = data.map((item) => ({
            id: item.district_id,
            label: item.district,
            value: item.district,
        }));
        const flatIndicator = data.flatMap((item, index) => item.indicators.map((ytem) => ({
            ...ytem,
            district_id: item.district_id,
            district: item.district,
        })))
        setAllIndicators([...flatIndicator] as any);
        setDistricts(listDistrict);
        setIndicators(defineIndicators);
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    };

    const handleSetChartDataRoot = (data: districtItem[]) => {
        setChartDataCloneRoot(data);
    };


    const handleSetLoading = (data: boolean) => setLoading(data);
    const handleSetIsFilter = (data: boolean) => setIsFilter(data);

    const chartProviderMemory = useMemo(
        () => ({
            chartData,
            handleSetChartData,
            loading,
            handleSetLoading,
            isFilter,
            handleSetIsFilter,
            handleSetChartDataRoot,
            chartDataRoot,
            handleUpdateDistrictIndicators,
            districtIndicators,
            districts,
            indicators,
            handleShowDetail,
            isShowDetail,
            handleSetInfoDetail,
            infoDetail,
            questions,
            handleUpdateSignIn,
            isSignIn,
            handleSetToken,
            token,
            districtActive,
            handleSetDistrictActive,
            sreenWidth,
            theme,
            handleSetTheme,
            userInfo,
            handleSetInfoUser,
            allIndicators,
            handleCheckSafari,
            isSafari
        }),
        [chartData,
            loading,
            isFilter,
            chartDataRoot,
            districtIndicators,
            districts,
            indicators,
            isShowDetail,
            infoDetail,
            questions,
            isSignIn,
            districtActive,
            token,
            sreenWidth,
            theme,
            userInfo,
            allIndicators,
            isSafari
        ]
    );

    return (
        <ChartContext.Provider value={chartProviderMemory}>
            {children}
        </ChartContext.Provider>
    );
};

function useBetterLife(): ChartContextData {
    const context = useContext(ChartContext);
    if (!context) {
        throw new Error("useSip must be used within an SipProvider");
    }
    return context;
}

export { ChartProvider, useBetterLife };
