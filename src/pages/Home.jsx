import { Tabs, Tab } from '@nextui-org/tabs';
import Layout from '@/components/layouts/Layout';
import Icon from '@/components/common/Icon';
import UserInput from '@/components/features/UserInput';

const tabItems = [
    { key: 'barcode', label: 'Barcode', icon: 'Barcode' },
    { key: 'qrcode', label: 'QrCode', icon: 'QrCode' },
];

const Home = () => {
    return (
        <Layout>
            <div className="flex flex-col w-full space-y-6">
                <Tabs
                    aria-label="Options"
                    size="sm"
                    color="primary"
                    variant="solid"
                    radius="sm"
                    fullWidth
                >
                    {tabItems.map((item) => (
                        <Tab
                            key={item.key}
                            title={
                                <div className="flex items-center space-x-2">
                                    <Icon name={item.icon} />
                                    <span>{item.label}</span>
                                </div>
                            }
                        >
                            <UserInput codeType={item.label} />
                        </Tab>
                    ))}
                </Tabs>
            </div>
        </Layout>
    );
};

export default Home;
