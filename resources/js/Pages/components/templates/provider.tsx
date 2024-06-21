import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import { districtItem } from "./chart";


interface ChartContextData {
    chartData: districtItem[] | undefined,
    handleSetChartData: (data: districtItem[]) => void,
    loading: boolean,
    handleSetLoading: (data: boolean) => void,
    handleSetIsFilter: (data: boolean) => void,
    isFilter: boolean,
}

interface ChartProviderProps {
    children?: React.ReactNode;
}

const ChartContext = createContext<ChartContextData>({} as ChartContextData);

const ChartProvider: React.FC<ChartProviderProps> = ({ children }) => {
    const [chartData, setChartData] = useState<districtItem[]>();
    const [loading, setLoading] = useState(false);
    const [isFilter, setIsFilter] = useState(false);


    const handleSetChartData = (data: districtItem[]) => {
        setChartData(data);
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    };
    const handleSetLoading = (data: boolean) => setLoading(data);
    const handleSetIsFilter = (data: boolean) => setIsFilter(data);

    const chartProviderMemory = useMemo(
        () => ({ chartData, handleSetChartData, loading, handleSetLoading, isFilter, handleSetIsFilter }),
        [chartData, loading, isFilter]
    );

    return (
        <ChartContext.Provider value={chartProviderMemory}>
            {children}
        </ChartContext.Provider>
    );
};

function useChart(): ChartContextData {
    const context = useContext(ChartContext);
    if (!context) {
        throw new Error("useSip must be used within an SipProvider");
    }
    return context;
}

export { ChartProvider, useChart };
