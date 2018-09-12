from rest_framework import serializers, viewsets
from .models import FlightsInfo

class FlightsInfoSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = FlightsInfo
        fields = ('name', 'content')
    def create(self, validated_data):
        user = self.context['request'].user
        flight_info = FlightsInfo.objects.create(user=user, **validated_data)
        return flight_info

class FlightsInfoViewSet(viewsets.ModelViewSet):
    serializer_class = FlightsInfoSerializer
    queryset = FlightsInfo.objects.none()
    def get_queryset(self):
        user = self.request.user

        if user.is_anonymous:
            return FlightsInfo.objects.none()
        else:
            return FlightsInfo.objects.filter(user=user)