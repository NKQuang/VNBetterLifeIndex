@extends("dashboard.layout")
@section("content")

<div class="w-full px-6 py-6 mx-auto loopple-min-height-78vh text-slate-500">
    <div class="relative flex flex-col w-full min-w-0  break-words bg-white border-0 border-transparent border-solid shadow-soft-xl rounded-2xl bg-clip-border mb-4">
        <div class="p-6 pb-0 mb-0 bg-slate-400 rounded-t-2xl">
            <h6>Bảng thống kế người dùng</h6>
        </div>
        <div class="flex-auto px-0 pt-0 pb-2">
            <div class="p-0 overflow-x-auto">
                <table class="items-center w-full mb-0 align-top border-gray-200 text-slate-500">
                    <thead class="align-bottom">
                        <tr>
                            <th class="px-6 py-3 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Người dùng</th>
                            <th class="px-6 py-3 pl-2 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Liên hệ</th>
                            <th class="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Trạng thái</th>
                            <th class="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Tham gia</th>
                            <th class="px-6 py-3 font-semibold capitalize align-middle bg-transparent border-b border-gray-200 border-solid shadow-none tracking-none whitespace-nowrap text-slate-400 opacity-70"></th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($user as $row)
                        <tr>
                            <td class="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                <div class="flex px-2 py-1">
                                    <div class="flex flex-col justify-center">
                                        <h6 class="mb-0 leading-normal text-sm">{{ $row->name }}</h6>
                                        <p class="mb-0 leading-tight text-xs text-slate-400">{{ $row->email }}</p>
                                    </div>
                                </div>
                            </td>
                            <td class="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                <p class="mb-0 font-semibold leading-tight text-xs"><i class="fa-solid fa-phone"></i> {{ $row->phone }}</p>
                                <p class="mb-0 leading-tight text-xs text-slate-400"><i class="fa-solid fa-location-dot"></i>{{ $row->address }}</p>
                            </td>
                            <td class="p-2 leading-normal text-center align-middle bg-transparent border-b text-sm whitespace-nowrap shadow-transparent">
                                <span class="bg-gradient-to-tl from-green-600 to-lime-400 px-2 text-xxs rounded py-1 inline-block whitespace-nowrap text-center align-baseline font-bold uppercase leading-none text-white">{{$row->status == 0 ? 'Kích hoạt' : 'Khóa'}}</span>
                            </td>
                            <td class="p-2 text-center align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                <span class="font-semibold leading-tight text-xs text-slate-400">{{date('d/m/Y', strtotime($row->created_at))}}</span>
                            </td>
                            <td class="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                <a href="{{ route('user.edit', $row->id) }}" class="font-semibold leading-tight text-xs text-blue-400"> <i class="fa-solid fa-pencil-alt"></i> </a>|
                                @if ($row->status == 0)
                                    <a href="{{ route('user.blockUser', $row->id) }}" class="font-semibold leading-tight text-xs text-red-400"> <i class="fa-solid fa-lock"></i> </a>
                                @else
                                    <a href="{{ route('user.blockUser', $row->id) }}" class="font-semibold leading-tight text-xs text-green-400"> <i class="fa-solid fa-unlock"></i> </a>
                                @endif
                            </td>
                        </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
@endsection
