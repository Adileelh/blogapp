import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import useUser from '../../hooks/useUser';
import { axiosPrivateInstance } from '../../api/apiConfig'; // Utiliser axiosPrivateInstance
import { Link } from 'react-router-dom';

import {Box,Center, Spacer, Card, CardHeader, CardBody, CardFooter, Button, Text, Heading, SimpleGrid, Flex } from '@chakra-ui/react'

export default function BlogList() {
    const { user } = useAuth();
    const [blogPosts, setBlogPosts] = useState([]); // Pour stocker les articles de blog
    const getUser = useUser();

    useEffect(() => {
        getUser();
        fetchBlogPosts(); // Récupérer les articles de blog au montage
    }, []);


    const fetchBlogPosts = async () => {
        try {
            const response = await axiosPrivateInstance.get('blog/blog-posts');
            console.log('Réponse du serveur:', response.data);
            setBlogPosts(response.data); // Stocker les articles de blog dans l'état
        } catch (error) {
            console.error('Erreur lors de la requête GET:', error);
        }
    };

    const handleButtonClick = async () => {
        try {
            const response = await axiosPrivateInstance.post('blog/generate_blog');
            console.log('Réponse du serveur:', response.data);
            fetchBlogPosts();
            // Traiter la réponse comme nécessaire
        } catch (error) {
            console.error('Erreur lors de la requête POST:', error);
        }
    };

    const truncateText = (text, length) => {
        return text.length > length ? text.substring(0, length) + '...' : text;
    };

    return (
        <div>
            {user ? (
                <>
                    {user.is_staff && (
                        <Box align="center" my="25px">

                            <Button colorScheme="purple" onClick={handleButtonClick}>Créer un post</Button>
                        </Box>
                    )}
                    <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
                        {blogPosts.map((post) => (
                            <Flex  key={post.id} >
                                <Card border="1px solid black" borderRadius="5px"w="100%" >
                                <CardHeader>
                                    {/* <Heading fontSize='14px'>{post.title}</Heading> */}
                                    <Heading fontSize='14px' p="2" justify="center">{post.title.replace(/"/g, '').replace(/^[^:]*: */, '')}</Heading>
                                    <Text fontSize='sm' px="2">Edité le {new Date(post.created_at).toLocaleDateString()}</Text>
                                </CardHeader>
                                <CardBody>
                                    <Text p="2">{truncateText(post.content, 100)}</Text>
                                </CardBody>
                                <Spacer />
                                <CardFooter align="center" justify="center">
                                <Center>
                                    <Link to={`/auth/blog/${post.id}`}>
                                        <Button colorScheme='teal' size='md' m="4">voir le post</Button>
                                    </Link>
                                </Center>
                                </CardFooter>
                            </Card>

                            </Flex>
                        ))}
                    </SimpleGrid>
                </>
            ) : (
                <h1>Vous n'êtes pas autorisé à envoyer des requêtes POST</h1>
            )}
        </div>
    );
}
