import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import RoomsGetbyTabs from './RoomsGetbyTabs';
import axios from '../../axios/index.js';
import { FormControl, InputLabel, MenuItem } from '@mui/material';
import { Select } from 'antd';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function AllRooms() {
  const [value, setValue] = React.useState(0);
  const [hosteldata, setHostelData] = React.useState([])
  const [loading, setLoading] = React.useState(false)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/hostels');
        setHostelData(response.data.data);
        console.log(response.data.data, 'dddd');
      } catch (error) {
        // Handle errors
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const [selectInp, setSelectInp] = React.useState("");

  const handleS = (event) => {
    const value = event.target.value;
    console.log(value, 'vvv');
    setSelectInp(value);
  };

  return (
    <Box sx={{ width: '80%', marginLeft: '10%' }}>

      <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '20px', marginBottom: '20px' }} >
        <h1 style={{ marginBottom: '10px' }} id="hostels">Hostls</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum maiores distinctio, modi veritatis officia dolorum perferendis, ab quidem voluptatum optio vel commodi omnis. Magni architecto sapiente suscipit dolorum, corporis aliquid!</p>

        <div style={{ width: '100%', height: 'max-content', marginTop: '10px' }} >
          {/* <FormControl fullWidth> */}
          {/* <InputLabel style={{ marginTop: '-12px' }} id="near-label">Near by</InputLabel> */}
          {/* <label htmlFor="near">Near by:</label> */}
      <select style={{width:'100%'}} id="near" name="near" value={selectInp} onChange={handleS}>
        <option value="" disabled>Near by</option>
        <option value="all" >All</option>
        <option value="punjab">Punjab University</option>
        <option value="umt">UMT University</option>
        <option value="uet">UET University</option>
        <option value="superior">Superior University</option>
        <option value="sargoda">Sargodha University</option>
        <option value="ucp">UCP University</option>
        <option value="ripha">Riphah University</option>
        <option value="education">Education University</option>
      </select>


          {/* </FormControl> */}
        </div>

      </Box>


      {/* <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="All" {...a11yProps(0)} />
          <Tab label="Avilable" {...a11yProps(1)} />
          <Tab label="Booked" {...a11yProps(2)} />
        </Tabs>
      </Box> */}
      {/* <CustomTabPanel value={value} index={0}>
        <RoomsGetbyTabs roomsbyhostel={false} data={hosteldata} />
      </CustomTabPanel> */}
      {/* <CustomTabPanel value={value} index={1}>
        <RoomsGetbyTabs roomsbyhostel={false} data={hosteldata}  />
      </CustomTabPanel> */}
      {/* <CustomTabPanel value={value} index={2}> */}
      <RoomsGetbyTabs roomsbyhostel={false} data={hosteldata} near={selectInp} />
      {/* </CustomTabPanel> */}
    </Box>
  );
}