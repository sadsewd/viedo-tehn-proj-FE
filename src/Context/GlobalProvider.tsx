import axios from 'axios';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';

type RPIConfigType = {
  alarmOn: boolean;
  cameraObserve: boolean;
  conf_threshold: number;
  objectDetectFeed: boolean;
  objectDetectObserve: boolean;
  sensorObserve: boolean;
};

type Sensors = {
  temperatura: number | null;
  apgaismojums: number | null;
  attalums: number | null;
  durvis: boolean | null;
} | null;

type GlobalContextType = {
  RPIConfig: RPIConfigType | null;
  // setRPIConfig: Dispatch<SetStateAction<RPIConfigType | null>>;
  connectionStatus: string;
  currentFeedImg: string | null;
  sensorData: Sensors;
  readyState: ReadyState;
  updateConfig: <K extends keyof RPIConfigType>(
    field: K,
    value: RPIConfigType[K],
  ) => void;
};

export const GlobalContext = createContext<GlobalContextType>({
  connectionStatus: '',
  currentFeedImg: null,
  readyState: -1,
  RPIConfig: null,
  sensorData: null,
  updateConfig: () => {},
});

export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [RPIConfig, setRPIConfig] = useState<RPIConfigType | null>(null);
  const socketUrl = 'wss://viedo-tehn-proj-be.onrender.com';
  const { lastMessage, readyState } = useWebSocket(socketUrl, {
    shouldReconnect: (_) => true,
    reconnectAttempts: 50,
    reconnectInterval: 3000,
  });
  const [currentFeedImg, setCurrentFeedImg] = useState<string | null>(null);
  const [sensorData, setSensorData] = useState<Sensors>(null);

  const updateConfig = <K extends keyof RPIConfigType>(
    field: K,
    value: RPIConfigType[K],
  ) => {
    setRPIConfig((prev) =>
      prev
        ? { ...prev, [field]: value }
        : {
            alarmOn: false,
            cameraObserve: false,
            conf_threshold: 0,
            objectDetectFeed: false,
            objectDetectObserve: false,
            sensorObserve: false,
            [field]: value,
          },
    );
  };

  useEffect(() => {
    if (lastMessage !== null) {
      const data = JSON.parse(lastMessage.data);
      if (data.command == 'CAM_FEED') setCurrentFeedImg(data.data);
      if (data.command == 'SENSORS') setSensorData(data.data);
      if (data.command == 'CONFIG') setRPIConfig(data.data);
    }
  }, [lastMessage]);

  useEffect(() => {
    if (RPIConfig !== null) axios.put('custom/CONFIG', RPIConfig);
  }, [RPIConfig]);

  useEffect(() => {
    axios.post('custom/GET_CONFIG');
  }, []);

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Veic savienošanos',
    [ReadyState.OPEN]: 'Savienots',
    [ReadyState.CLOSING]: 'Viec atvienošanos',
    [ReadyState.CLOSED]: 'Atvienots',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];

  return (
    <GlobalContext.Provider
      value={{
        RPIConfig,
        // setRPIConfig,
        connectionStatus,
        currentFeedImg,
        sensorData,
        readyState,
        updateConfig,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
