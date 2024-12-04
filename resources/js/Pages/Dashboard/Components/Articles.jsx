import { asset, textLimit, formatDate } from '@/Components/Config/Helpers';
import { Link, router, usePage } from '@inertiajs/react';
import { Button, Card, CardActions, CardContent, CardMedia, Chip, Pagination, Typography } from '@mui/material';
import { Fragment, useState } from 'react';
import ImageCard from './ImageCard';

export default function Articles() {

    const {
        articles
    } = usePage().props;

    const [page, setPage] = useState(articles?.current_page || 1);

    const handleChange = (e, page) => {

        setPage(page);

        router.visit(route('dashboard', { ...route().params, page }), {
            preserveScroll: true,
            preserveState: true
        });
    };

    return (
        <Fragment>
            <div className='articles row'>
                {
                    articles?.data?.map((item, index) => (
                        <div className='col-xl-3 col-lg-4 col-md-6 col-12 my-3' key={index}>
                            <Card sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
                                <a href={item?.url} target="_blank" rel="noopener noreferrer">
                                    <ImageCard
                                        item={item}
                                    />
                                </a>
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <div className="mb-3">
                                        {
                                            item?.category &&
                                            <Chip label={item?.category} className="me-1" />
                                        }
                                        <Chip label={item?.api_source} />
                                    </div>
                                    <a href={item?.url} target="_blank" rel="noopener noreferrer">
                                        <Typography
                                            title={item?.title}
                                            gutterBottom
                                            className='title'
                                            variant="h6"
                                            component="div"
                                        >
                                            {item?.title}
                                        </Typography>
                                    </a>
                                    {
                                        item?.author &&
                                        <p className='mb-1' title={`By ${item?.author}`}><small>By {textLimit(item?.author, 40)}</small></p>
                                    }
                                    <Typography className="description" variant="body2" sx={{ color: 'text.secondary' }}>
                                        {item?.description || item?.content}
                                    </Typography>

                                    {
                                        item?.source &&
                                        <div className="mt-2 mb-0">
                                            <p><small><b>Source:</b> {item?.source}</small></p>
                                        </div>
                                    }
                                    {
                                        item?.published_at &&
                                        <div className="mb-3">
                                            <p><small><b>Published:</b> {formatDate({ date: item?.published_at })}</small></p>
                                        </div>
                                    }
                                </CardContent>
                                <CardActions>
                                    <Button size="small"><a href={item?.url} target="_blank" rel="noopener noreferrer">View Article</a></Button>
                                </CardActions>
                            </Card>

                        </div>
                    ))
                }
            </div>
            <div className="my-5">
                <Pagination
                    count={articles?.last_page}
                    showFirstButton
                    showLastButton
                    page={page}
                    onChange={handleChange}
                />
            </div>
        </Fragment>
    );
}
