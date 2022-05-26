import { Card, CardHeader, Chip, CircularProgress, Container, Divider, Grid, Paper, Skeleton, Stack, Typography } from "@mui/material"
import { useTheme } from "@mui/system";
import { useEffect, useState } from "react";
import { BsBattery, BsBatteryHalf, BsCheck, BsCheck2, BsCloudSlash, BsExclamationTriangleFill } from "react-icons/bs";
import { factory } from "typescript";
import { FactoryTypeCol } from "../components/production/col_type";

interface FactoryData {
    constructor: any[],
    assembler: any[],
    blender: any[],
    foundry: any[],
    manufactor: any[],
    particle: any[],
    refinery: any[],
    smelter: any[],
};

export const Factorys:React.FC = (props) => {
    const [doLoadData, setLoadData] = useState(true);
    const [factorys, setFactorys] = useState<undefined | any>(undefined);
    const [allFactorys, setAllFactorys] = useState<undefined | any>(undefined);
    const [loadingText, setLoadingText] = useState("Data is being loaded ...");

    const theme = useTheme();

    let intervalVar:any;

    const loadData = async () => {
        // setLoadingText("Data is being loaded ...");
        intervalVar = setInterval(async ()=>{
            const response = await fetch("http://127.0.0.1:8080/getFactory");
            const data = await response.text();
            const getPower = JSON.parse(data);
            console.info(getPower);
            setFactorys(getPower);
        }, 5000);
    };

    useEffect(()=>{
        loadData();

        return function cleanup() {
            console.error("CLEANUP!");
            clearInterval(intervalVar);
        };
    }, [])

    useEffect(()=>{
        if(factorys != undefined){
            setLoadingText("Sorting Data ...");
            let tmp:any = [
                [],
                [],
                [],
                [],
                [],
                [],
            ];
    
            for (let i = 0; i < factorys.length; i++) {
                const factory:any = factorys[i];
                switch (factory.building) {
                    case "Constructor":
                        tmp[0].push(factory)
                        break;
                    case "Assembler":
                        tmp[1].push(factory)
                        break;
                    case "Manufacturer":
                        tmp[2].push(factory)
                        break;
                    case "Refinery":
                        tmp[3].push(factory)
                        break;
                    case "Blender":
                        tmp[4].push(factory)
                        break;
                    case "Particle Accelerator":
                        tmp[5].push(factory)
                        break;
                
                    default:
                        console.log("ERROR")
                        break;
                }
            }

            setAllFactorys(tmp);
        }
    }, [factorys])

    return(
        <Container>
            <Typography variant="h3" sx={{marginTop: '30px', marginBottom: '30px'}}>All Factorys</Typography>
             
            <Divider sx={{marginBottom: '50px'}}/>

            
            
            {factorys && allFactorys ? 
                <>
                    <Grid container spacing={2} sx={{marginBottom: '30px'}}>
                        <Grid item xs>
                            <Card>
                                <CardHeader title={factorys.length} subheader="Total Number of Factorys"></CardHeader>
                            </Card>
                        </Grid>
                        <Grid item xs>
                            <Card>
                                <CardHeader title={ " MW"} subheader="Total Power Production"></CardHeader>
                            </Card>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        {allFactorys.map((factory:any, i:number) => {
                            if (factory.length > 0) {
                                return(
                                    <FactoryTypeCol factorys={factory}/>
                                )
                            } else{
                                return <></>
                            }
                        })}
                    </Grid>
                </>
            : 
                <Stack sx={{width: '100%', height: '300px'}} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                    <CircularProgress/>
                    <Typography sx={{marginTop: '20px'}}>
                        {loadingText}
                    </Typography>
                </Stack>
            }
        </Container>
    )
}