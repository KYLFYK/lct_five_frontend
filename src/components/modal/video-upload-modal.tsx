import React, { useRef, useState } from 'react';
import { Button, Modal, Typography, Space } from 'antd';
import styled from '@emotion/styled';

const Wrapper = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const ButtonWrapper = styled('div')`
  margin-top: 20px;
  display: flex;
  gap: 10px;
`;

type TVideoUploadModalProps = {
    isModalOpen: boolean,
    handleClose: () => void,

}
export const VideoUploadModal = ({isModalOpen, handleClose}:TVideoUploadModalProps) => {
    const [file, setFile] = useState<File | undefined>();
    const uploadButtonRef = useRef<HTMLInputElement | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const selectedFile = e.target.files[0];
            if (selectedFile.type.includes('video/')) {
                setFile(selectedFile);
            } else {
                Modal.error({
                    title: 'Ошибка',
                    content: 'Пожалуйста, выберите видеофайл.',
                });
                e.target.value = ''; // Сброс выбранного файла
                setFile(undefined);
            }
        }
    };

    const handleUpload = async () => {
        // Добавьте здесь логику для загрузки файла на сервер
        Modal.success({
            title: 'Успешно',
            content: 'Файл успешно загружен.',
        });
        setFile(undefined);
        handleClose();
    };

    const handleClear = () => {
        if (uploadButtonRef.current) {
            uploadButtonRef.current.value = '';
        }
        setFile(undefined);
    };

    return (
        <Modal title="Загрузить видео" visible={isModalOpen} footer={[]}>
            <Wrapper>
                <Typography.Title level={4}>
                    Выберите виодеофайл
                </Typography.Title>
                <input ref={uploadButtonRef} id="file" type="file" onChange={handleFileChange} style={{ display: 'block' }} />
                {file && (
                    <section>
                        <Typography.Title level={5}>Детали файла:</Typography.Title>
                        <Space direction="vertical">
                            <Typography.Text>Имя: {file.name}</Typography.Text>
                            <Typography.Text>Тип: {file.type}</Typography.Text>
                            <Typography.Text>Размер: {file.size} байт</Typography.Text>
                        </Space>
                    </section>
                )}

                {file && (
                    <ButtonWrapper>
                        <Button type="primary" onClick={handleUpload}>
                            Загрузить
                        </Button>
                        <Button type="primary" danger onClick={handleClear}>
                            Очистить
                        </Button>
                    </ButtonWrapper>
                )}
            </Wrapper>
        </Modal>
    );
};
