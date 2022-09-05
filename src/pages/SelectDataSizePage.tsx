import React from 'react';
import { useHistory } from 'react-router-dom';
import SelectDataSize from '../components/SelectDataSize';
import DataSize from '../types/DataSize';

const SelectDataSizePage: React.FC = () => {
    const history = useHistory();

    const handleDataSizeChange = (dataSize: DataSize) => {
        history.push(`/table?data=${dataSize}`);
    };

    return (
        <div className="row justify-content-center">
            <div className="col col-lg-auto">
                <SelectDataSize onSubmit={handleDataSizeChange} />
            </div>
        </div>
    );
}

export default SelectDataSizePage;
