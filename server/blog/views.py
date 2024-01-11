from .models import BlogPost, Comment

from rest_framework import viewsets
from .serializers import BlogPostSerializer, CommentSerializer
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

from openai import OpenAI
from dotenv import load_dotenv
import os

# Charger les variables d'environnement depuis `.env`
load_dotenv()

client = OpenAI(api_key=os.environ['OPENAI_API_KEY'])


@api_view(['POST'])
@permission_classes([IsAdminUser])  # Autoriser uniquement les superusers
def create_blog_post(request):
    # Génération du titre
    title_response = client.completions.create(
        model="gpt-3.5-turbo-instruct",
        prompt="Generate a catchy title for a blog post about the latest trends in technology.",
        max_tokens=60
    )
    title = title_response.choices[0].text.strip() if title_response.choices else "Default Title"

    # Génération du contenu
    content_response = client.completions.create(
        model="gpt-3.5-turbo-instruct",
        prompt="Write a detailed blog post about the latest trends in technology.",
        max_tokens=500
    )
    content = content_response.choices[0].text.strip() if content_response.choices else "Default Content"
    # Assurez-vous que l'utilisateur est authentifié
    if not request.user.is_authenticated:
        return Response({"error": "Authentication required"}, status=401)

    # Création du blogpost avec l'auteur
    blog_post = BlogPost(title=title, content=content, author=request.user)
    blog_post.save()

    return Response({"success": True, "message": "Blog post generated and saved."})

class BlogPostViewSet(viewsets.ModelViewSet):
    queryset = BlogPost.objects.all()
    serializer_class = BlogPostSerializer

    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            self.permission_classes = [IsAdminUser, ]
        return super(BlogPostViewSet, self).get_permissions()

class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    def get_permissions(self):
        if self.action in ['create']:
            self.permission_classes = [IsAuthenticated, ]
        return super(CommentViewSet, self).get_permissions()
