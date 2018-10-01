from rest_framework import serializers, viewsets
from .models import Flights, Aircraft, Instructor

from django.db.models import Sum, Count, F


class FlightsSerializer(serializers.HyperlinkedModelSerializer):
    # pic_count = serializers.IntegerField()

    class Meta:
        model = Flights
        fields = ('name', 'remarks', 'created_at', 'no_instument_app',
                  'no_ldg', 'cross_country', 'pic', 'dual_rec', 'actual_instr',
                  'sim_instr', 'day', 'night', 'airports_visited', 'fly_date',
                  'snippet', 'aircraft', 'license_type', 'total_hours', 'sv_html', 'sv_script', 'id')
                  # added pic_count 

    def create(self, validated_data):
        user = self.context['request'].user
        flight = Flights.objects.create(user=user, **validated_data)
        return flight


class InstructorSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = Instructor
        fields = ( 'id', 'name', 'description', 
                    'license_number', 'ratings', 'photo', 
                        'contact_number', 'contact_email')

    def create(self, validated_data):
        user = self.context['request'].user
        instructor = Instructor.objects.create(user=user, **validated_data)
        return instructor


class InstructorViewSet(viewsets.ModelViewSet):
    serializer_class = InstructorSerializer
    queryset = Instructor.objects.none()

    def get_queryset(self):
        user = self.request.user

        if user.is_anonymous:
            return Instructor.objects.none()
        else:
            return Instructor.objects.filter(user=user)

class FlightsViewSet(viewsets.ModelViewSet):
    serializer_class = FlightsSerializer
    queryset = Flights.objects.none()

    def get_queryset(self):
        user = self.request.user

        if user.is_anonymous:
            return Flights.objects.none()
        else:
            return Flights.objects.filter(user=user).order_by('-created_at')


class AircraftSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Aircraft
        fields = ('man_type', 'tail_number', 'license_type', 'id', 'photo')

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
            return Aircraft.objects.filter(user=user).order_by("tail_number")


class LicenseViewSet(viewsets.ModelViewSet):
    serializer_class = AircraftSerializer
    queryset = Aircraft.objects.none()

    def get_queryset(self):
        user = self.request.user

        if user.is_anonymous:
            return Aircraft.objects.none()
        else:
            return Aircraft.objects.filter(license_type='sel')

# hard coded way of filtering aircraft
# need to reimplement the user filter
class FilterAircraftViewSet(viewsets.ModelViewSet):
    serializer_class = AircraftSerializer
    queryset = Aircraft.objects.none()

    def get_queryset(self):
        user = self.request.user
        # return Aircraft.objects.filter(license_type='sel')

        if user.is_anonymous:
            return Flights.objects.none()
        else:
            return Aircraft.objects.filter(user=user)


# tried to aggregate filtered data.  Multiple attempts.  Not yet working also needs to reimplement user filter
class FilterFlightsViewSet(viewsets.ModelViewSet):
    serializer_class = FlightsSerializer
    queryset = Flights.objects.none()

    def get_queryset(self):
        print("FLIGHTS USER: ", self.request.user)
        # import pdb; pdb.set_trace()
        # user = self.request.user
        # print(Flights.objects.filter(tail_number='tailnumber1'))
        # return Flights.objects.filter(tail_number='tailnumber1').aggregate(Sum('pic'))
        # return Flights.objects.filter(tail_number='tailnumber1').annotate(name_count=Count('pic')).aggregate(Sum('pic'))
        # sum = []
        #for i in Flights.objects.filter(tail_number="tail1"):
        # fl = Flights.objects.filter(tail_number='tail1').values('pic')
        # print("fl", fl)
        # sum_fl = fl.annotate(pic_count=Sum('pic'))
        # print("sum", sum_fl)
        # return sum_fl
        user = self.request.user
        aircraft = self.request.aircraft.id
        if user.is_anonymous:
            return Flights.objects.none()
        else:
            return Flights.objects.filter(user=user, aircraft=aircraft)

        #     c = Flights.objects.filter(tail_number="tail1")
        #     sum.append(c[i])
        # print('SUM', sum)
        # Flights.objects.annotate(pic_count=sum)
            # print("ccccccccc", c)
            # return c 

            #  sum += i.pic
        # c = Flights.objects.filter(tail_number='tailnumber1')
        # c = Flights.objects.filter(tail_number='tail1')
        # print(c)

        # a = []

        # sum = 0

        # for i in c:
        #     print("i asdlfkjasd: ", i.pic)
        #     d = c.annotate(pic_count=Sum('pic'))
        #     Flights.pic_count.save(d)
        # return self.pic_count
        # print('BEFORE ASDFKAS;DLFKJAS;LDF')
        # print('pic', sum)
        # print('AFTER AS;DLFKJAS;LDKFJAL;SJ')
        # print("dddddddddd", d[0].pic_count)
        # print(dir(c))

        # return sum
        # return c