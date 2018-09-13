from rest_framework import serializers, viewsets
from .models import Flights, Aircraft


class FlightsSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Flights
        fields = ('name', 'remarks', 'created_at', 'no_instument_app', 
                'no_ldg', 'cross_country', 'pic', 'dual_rec', 'actual_instr',
                'sim_instr', 'day', 'night', 'airports_visited', 'fly_date',
                'snippet', 'tail_number', 'license_type', 'man_type',)

    def create(self, validated_data):
        user = self.context['request'].user
        flight = Flights.objects.create(user=user, **validated_data)
        return flight


class FlightsViewSet(viewsets.ModelViewSet):
    serializer_class = FlightsSerializer
    queryset = Flights.objects.none()

    def get_queryset(self):
        user = self.request.user

        if user.is_anonymous:
            return Flights.objects.none()
        else:
            return Flights.objects.filter(user=user)


class AircraftSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Aircraft
        fields = ('man_type', 'tail_number', 'license_type')

    def create(self, validated_data):
        user = self.context['request'].user
        aircraft = Aircraft.objects.create(user=user, **validated_data)
        return aircraft


class AircraftViewSet(viewsets.ModelViewSet):
    serializer_class = AircraftSerializer
    queryset = Aircraft.objects.none()

    def get_queryset(self):
        user = self.request.user

        if user.is_anonymous:
            return Aircraft.objects.none()
        else:
            return Aircraft.objects.filter(user=user)
