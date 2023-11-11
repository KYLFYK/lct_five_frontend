import Image from 'antd/lib/image';import Typography from 'antd/lib/typography';import { TNode } from '../types/tests';export const nodeComponentByType = (node: TNode) => {  if (!node?.type) {    return null;  }  switch (node.type) {    case 'text':      return <Typography.Paragraph>{node.value}</Typography.Paragraph>;    case 'title':      return (        <Typography.Title level={node.level}>{node.value}</Typography.Title>      );    case 'image':      return <Image width={'100%'} src={node.value} preview={false} />;    case 'video':      return <video src={node.value} />;  }};export const statusToPresentation = (status: string) => {  switch (status){    case 'complete':      return 'Завершен';    case 'failure':      return 'Не пройден';    case 'in-progress':      return 'В процессе';    case'not-started':      return 'Не начат'    case 'time-end':      return 'Время истекло';  }}