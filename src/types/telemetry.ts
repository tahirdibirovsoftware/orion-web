export interface TelemetryData {
    packetid: number;
    packetnumber: number;
    satellitestatus: number;
    errorcode: string;
    missiontime: string;
    pressure1: string;
    pressure2: string;
    altitude1: string;
    altitude2: string;
    altitudedifference: string;
    descentrate: string;
    temp: string;
    voltagelevel: string;
    gps1latitude: string;
    gps1longitude: string;
    gps1altitude: string;
    pitch: string;
    roll: string;
    yaw: string | null;
    lnln: string;
    iotdata: string;
    teamid: number;
  }